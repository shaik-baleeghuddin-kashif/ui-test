import { getOffices } from '../../services/officeService';

const OfficeList = () => {
  const handleFetchOffice = async () => {
    try {
      const data = await getOffices({
        filter: { id: 1, code: 'xyz' },
        orderBy: ['name ASC', 'city DESC'],
        pageSize: 10,
        offset: 0,
      });
      console.log(data); // The offices data will be logged here
    } catch (error) {
      console.error(error); // Log any errors here
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleFetchOffice}>Fetch Office</button>
    </div>
  );
};

export default OfficeList;
