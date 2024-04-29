/** @format */
const InternshipDistributionList = () => {
  return (
    <div className="overflow-x-auto h-full w-full">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label htmlFor="velg alle">
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Field</th>
            <th>Free Spots</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>Purple</td>
            <th>
              <button className="btn btn-ghost btn-xs text-lg text-center">
                +
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InternshipDistributionList;
