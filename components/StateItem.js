import { useAppContext } from "../contexts/state.js";
const StateItem = ({ state: { state, agency, phone, website, flag } }) => {
  const { addClick } = useAppContext();
  return (
    <div className='card btext-center'>
      <img src={flag} alt='' className='round-img' style={{ width: "60px" }} />

      <h3>{state}</h3>
      <p>{phone}</p>

      <div>
        <a
          target='_blank'
          rel='noreferrer noopener'
          onClick={() =>
            addClick({
              loc: `${state}`,
              time: `${new Date().getTime()}`,
              btn: "Visited State Website",
            })
          }
          href={website}
          className='btn btn-dark btn-sm my-1'>
          {agency}
        </a>
      </div>
    </div>
  );
};

export default StateItem;
