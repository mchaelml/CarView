using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Models;
using vega.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);

        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
        Task<Vehicle> GetVehicleWithMake(int id);
    }
}