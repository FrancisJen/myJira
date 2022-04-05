export const SearchPanel = ({param, setParma, users}) => {

  // tips: js中的{}是一组对象
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParma({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(evt) =>
            setParma({
              ...param,
              personId: evt.target.value,
            })
          }
        >
          <option value={""}>stakeholder</option>
          {users.map((user) => (
            <option key = {user.id} value={user.id}> {user.name} </option>
          ))}
        </select>
      </div>
    </form>
  );
};
