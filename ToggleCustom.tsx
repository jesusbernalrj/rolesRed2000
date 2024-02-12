
import './toggleCustom.css';

interface ToggleCustomProps {
  id?: string;
  setToggle: React.Dispatch<React.SetStateAction<{[key: string]: boolean;}>>
  toggle: {[key: string]: boolean;}
  singleActive?: boolean;
  onChange?: () => void;  
}
const ToggleCustom = ({
  id,
  setToggle,
  toggle,
  singleActive = false,
}: ToggleCustomProps) => {
  const uniqueId = `toggle_mode-toggle-${id}`; 

  const handleToggle = (id: string) => {
    if (singleActive) {
    if(toggle[id]) {
      setToggle((prevToggle) => ({
        ...prevToggle,
        [id]: !prevToggle[id],
      }));
      
    } else {
      setToggle((prevToggle) => ({
        ...Object.keys(prevToggle).reduce((acc, curr) => {
          acc[curr] = false;
          return acc;
        }, {} as {[key: string]: boolean;}),
        [id]: true,
      }));
    }
  }
      else {
      setToggle((prevToggle) => ({
        ...prevToggle,
        [id]: !prevToggle[id],
      }));
    }
  };

 const onChange = () => {
    handleToggle(id as string);
 }

 const isChecked = toggle[id as string] || false;

  const inputClass = `toggle_mode_input ${isChecked ? 'true' : ''}`;
  const labelClass = `toggle_mode_label ${isChecked ? 'true' : ''}`;
  
  return (
    <div className='toggle_mode relative'>
    <input
        className={inputClass}
        type='checkbox'
        id={uniqueId}
        checked={isChecked}
        onChange={onChange}
        />
    <label className={labelClass}  htmlFor={uniqueId}>
      {/* { !isChecked  ? <span style={{position:'absolute', right:'60px', zIndex:'50', top:'2px',}} className='sun_icon '>%</span> : null}
     { isChecked ? <span style={{position:'absolute', left:'35px', zIndex:'50', top:'2px'}}  className='moon_icon '>$</span> : null} */}
    </label>
</div>
  );
};

export default ToggleCustom;
