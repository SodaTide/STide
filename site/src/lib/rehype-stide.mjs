/**
 * 构建期 rehype 插件（STide）
 *
 * 只做两件 01/02 里写死、Markdown 本身给不了的事：
 * 1. 正文里的独立图片包成 <figure> + <figcaption>（图注 = title || alt，12px Mono）。
 * 2. 外链补 rel="noopener noreferrer nofollow"（02 §4.2）。
 *
 * heading id 不在这里生成：Astro 的 markdown 管线在构建期已经写入 id，并通过
 * `render()` 返回同一份 headings，目录直接消费它，天然是同一个 slug 函数
 * （design/02 §4.2 要求「构建期生成 + 与目录同 slug」）。
 */

/** @param {import('hast').Root} tree */
export function rehypeStide() {
  return (tree) => {
    walk(tree, null);
  };
}

function walk(node, parent) {
  if (!node || !Array.isArray(node.children)) return;

  for (let i = 0; i < node.children.length; i += 1) {
    const child = node.children[i];

    if (child.type === 'element' && child.tagName === 'a') {
      const href = String(child.properties?.href ?? '');
      if (/^https?:\/\//i.test(href)) {
        child.properties.rel = ['noopener', 'noreferrer', 'nofollow'];
      }
    }

    if (child.type === 'element' && child.tagName === 'p') {
      const meaningful = (child.children ?? []).filter(
        (n) => !(n.type === 'text' && String(n.value).trim() === ''),
      );
      if (meaningful.length === 1 && meaningful[0].type === 'element' && meaningful[0].tagName === 'img') {
        const img = meaningful[0];
        const props = img.properties ?? {};
        const caption = String(props.title ?? props.alt ?? '').trim();
        if (!props.loading) props.loading = 'lazy';
        if (!props.decoding) props.decoding = 'async';

        const figure = {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['prose-figure'] },
          children: [img],
        };
        if (caption) {
          figure.children.push({
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [{ type: 'text', value: caption }],
          });
        }
        node.children[i] = figure;
        continue;
      }
    }

    walk(child, node);
  }
}
