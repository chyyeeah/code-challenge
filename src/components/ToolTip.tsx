const ToolTip = ({ minChar, maxChar, leftPos }) => {
  return (
    <div style={{ position: 'absolute', top: '-100px', left: leftPos, fontSize: '.90em', backgroundColor: '#fff', border: '1px solid lightgray',borderRadius: '10px'}}>
      <ul style={{margin: 0, padding: '5px 10px 5px 25px', letterSpacing: '0.5px'}}>
        <li>Must be at least {minChar} characters</li>
        <li>Must be {maxChar} characters or less</li>
        <li>Must contain at least 1 symbol [!@#$%]</li>
        <li>Must contain at least 1 letter [a-zA-Z]</li>
        <li>Must contain at least 1 number [0-9]</li>
      </ul>
    </div>
  );
};

export default ToolTip;