const INDENT = 4;

const makeIndent = (depth, offset = 0) => ' '.repeat(depth * INDENT - offset);

const stringify = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'object') return '[complex value]';
  return value;
};

const render = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.flatMap((node) => {
      const {
        type, key, value, oldValue, newValue, children,
      } = node;

      switch (type) {
        case 'nested':
          return `${makeIndent(depth)}${key}: {\n${iter(children, depth + 1)}\n${makeIndent(depth)}}`;

        case 'unchanged':
          return `${makeIndent(depth)}  ${key}: ${stringify(value)}`;

        case 'added':
          return `${makeIndent(depth, 2)}+ ${key}: ${stringify(value)}`;

        case 'removed':
          return `${makeIndent(depth, 2)}- ${key}: ${stringify(value)}`;

        case 'updated':
          return [
            `${makeIndent(depth, 2)}- ${key}: ${stringify(oldValue)}`,
            `${makeIndent(depth, 2)}+ ${key}: ${stringify(newValue)}`,
          ];

        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default render;
