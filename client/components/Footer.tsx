export default function Footer() {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent',
        padding: '10px',

        textAlign: 'left',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src="/2.png"
        alt="logo"
        style={{
          height: '1.5em',
          marginRight: '10px',
        }}
      />
      <h3 style={{ display: 'inline-block', margin: 0 }}>
        Created by: Aimee K - Regie M - Brad C - Callum G
      </h3>
    </footer>
  )
}
