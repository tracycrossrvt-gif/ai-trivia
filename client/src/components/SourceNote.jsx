// Shows where a question's answer comes from, as a link when possible.
export default function SourceNote({ source }) {
  if (!source?.title) return null;

  const isLink = typeof source.reference === 'string' && source.reference.startsWith('https://');

  return (
    <small className="source-note">
      Source:{' '}
      {isLink ? (
        <a href={source.reference} target="_blank" rel="noopener noreferrer">
          {source.title}
        </a>
      ) : (
        source.title
      )}
    </small>
  );
}
