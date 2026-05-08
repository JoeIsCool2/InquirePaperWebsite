type Props = {
  filled: boolean
  large?: boolean
  title?: string
}

export default function CrownBadge({ filled, large, title }: Props) {
  return (
    <div
      className={
        'crown-badge-svg' +
        (large ? ' crown-badge-svg--lg' : '') +
        (filled ? ' crown-badge-svg--filled' : '')
      }
      title={title}
    >
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden>
        <path
          fill="currentColor"
          d="M5 16l1.2-8h2.2L12 6l3.6 2h2.2L19 16H5Zm2.1-1.5h9.8l-.7-5.1h-1.5L12 7.2 9.3 9.4H7.8l-.7 5.1ZM7 18.5h10v1.5H7v-1.5Z"
        />
      </svg>
    </div>
  )
}
