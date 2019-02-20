using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;
using vega.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository iRepository;
        private readonly IUnitOfWork unitOfWork;
        public VehiclesController(IMapper mapper, IVehicleRepository iRepository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.iRepository = iRepository;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var vehicle = await iRepository.GetVehicle(id);

                if (vehicle == null)
                    return NotFound();

                var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
                return Ok(result);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [HttpGet]
        public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource filter)
        {
            var filters = mapper.Map<VehicleQueryResource, VehicleQuery>(filter);
            var queryResult = await iRepository.GetVehicles(filters);

            return mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var newVehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
                newVehicle.LastUpdated = DateTime.Now;
                iRepository.Add(newVehicle);
                await unitOfWork.Complete();

                newVehicle = await iRepository.GetVehicle(newVehicle.Id);

                var result = mapper.Map<Vehicle, VehicleResource>(newVehicle);
                return Ok(result);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }

        }
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var newVehicle = await iRepository.GetVehicle(id);

                if (newVehicle == null)
                    return NotFound();

                mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, newVehicle);
                newVehicle.LastUpdated = DateTime.Now;
                await unitOfWork.Complete();

                var result = mapper.Map<Vehicle, VehicleResource>(newVehicle);
                return Ok(result);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }

        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var vehicle = await iRepository.GetVehicle(id, includeRelated: false);

                if (vehicle == null)
                    return NotFound();

                iRepository.Remove(vehicle);
                await unitOfWork.Complete();

                return Ok(id);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }
    }
}