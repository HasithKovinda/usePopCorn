
type ErrorProps={
  message:string
}

function ErrorMessage({message}:ErrorProps) {
  return (
    <p className="error">
    <span>⛔️</span> {message}
  </p>
  )
}

export default ErrorMessage