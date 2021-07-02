export default function ExposedBypass({ bypassWarning, setBypassWarning }) {
  return (
    <label>
      <input
        type="checkbox"
        checked={bypassWarning}
        onChange={() => setBypassWarning(!bypassWarning)}></input>
      Continue with exposed password.
    </label>
  )
};
