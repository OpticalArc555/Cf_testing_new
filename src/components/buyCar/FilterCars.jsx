/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Typography } from "@material-tailwind/react";
import { FaFilter } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import {
  useGetOnlyBrandsQuery,
  useGetVariantsQuery,
} from "../../services/brandAPI";
import { Autocomplete, TextField } from "@mui/material";

// eslint-disable-next-line react/prop-types
const FilterCars = ({ setUrlState }) => {
  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [value, setValue] = useState([1000000, 7000000]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: variantData } = useGetVariantsQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  useEffect(() => {
    if (variantData) {
      const models = [...new Set(variantData.list.map((item) => item.variant))]; // Use Set to remove duplicates
      setModelOptions(models);
    }
  }, [variantData]);

  const handleBrandChange = (event, newValue) => {
    const brand = newValue;
    setSelectedBrand(brand);
    setFilterForm({
      ...filterForm,
      brand,
      model: "", // Reset model when brand changes
    });
  };

  const handleModelChange = (event, newValue) => {
    const model = newValue;
    setFilterForm({
      ...filterForm,
      model,
    });
  };

  const [filterForm, setFilterForm] = useState({
    area: "",
    year: "",
    brand: "",
    model: "",
    fuelType: "",
    transmission: "",
    ownership: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterForm({ ...filterForm, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const minPrice = value[0]; // Minimum price from the slider
    const maxPrice = value[1]; // Maximum price from the slider
    const url = {
      Area: filterForm.area,
      Year: filterForm.year,
      Brand: filterForm.brand.toUpperCase(),
      Model: filterForm.model,
      FuleType: filterForm.fuelType,
      Transmission: filterForm.transmission,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
    };
    setUrlState(url);
  };

  const resetForm = () => {
    setValue([1000000, 7000000]); // Reset slider values to default
    setSelectedBrand(""); // Reset brand selection
    setModelOptions([]); // Reset model options
    setFilterForm({
      area: "", // Reset area
      year: "", // Reset year
      brand: "", // Reset brand
      model: "", // Reset model
      fuelType: "", // Reset fuel type
      transmission: "", // Reset transmission
    });
    setUrlState({
      area: "",
      year: "",
      brand: "",
      model: "",
      fuelType: "",
      transmission: "",
      MinPrice: 0, // Reset MinPrice
      MaxPrice: 7000000, // Reset MaxPrice
    });
  };

  let formattedAmountMin = new Intl.NumberFormat("en-IN").format(value[0]);
  let formattedAmountMax = new Intl.NumberFormat("en-IN").format(value[1]);

  const AreaData = [
    { area: "Viman Nagar", year: 2005 },
    { area: "Koregaon Park", year: 2006 },
    { area: "Aundh", year: 2007 },
    { area: "Kothrud", year: 2008 },
    { area: "Hadapsar", year: 2009 },
    { area: "Shivajinagar", year: 2010 },
    { area: "Kalyani Nagar", year: 2011 },
    { area: "Pimpri-Chinchwad", year: 2012 },
    { area: "Magarpatta", year: 2013 },
    { area: "Wadgaon Sheri", year: 2014 },
    { area: "Katraj", year: 2015 },
    { area: "Model Colony", year: 2016 },
    { area: "Pune Cantonment", year: 2017 },
    { area: "Senapati Bapat Road", year: 2018 },
    { area: "Bhosari", year: 2018 },
    { area: "Chakan", year: 2019 },
    { area: "Bavdhan", year: 2020 },
    { area: "Hinjewadi", year: 2021 },
    { area: "Baner", year: 2022 },
    { area: "Kharadi", year: 2023 },
    { area: "Wagholi", year: 2024 },
  ];

  const FuleType = [
    { fuelType: "Petrol" },
    { fuelType: "Diesel" },
    { fuelType: "Electric" },
    { fuelType: "CNG" },
    { fuelType: "Petrol+CNG" },
  ];

  const Transmission = [
    { transmission: "Automatic" },
    { transmission: "Manual" },
  ];

  const handleSliderChange = (event, newValue) => {
    const [min, max] = newValue;
    if (max - min >= 500000) {
      setValue(newValue);
    } else {
      if (min === value[0]) {
        setValue([value[0], value[0] + 500000]);
      } else {
        setValue([value[1] - 500000, value[1]]);
      }
    }
  };
  return (
    <div className="border-2 shadow-lg rounded-lg">
      <div className="flex justify-end mr-5 ">
        <button
          type="button"
          className="md:hidden -mt-10 text-black font-bold flex hover:rounded-2xl hover:shadow-2xl "
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="mt-1 mr-1">
            <FaFilter />
          </span>
          Filter
        </button>
      </div>

      <Card
        className={`p-4 ${
          showFilters ? "block" : "hidden bg-gray-100"
        } md:block`}
      >
        <div className="space-y-4">
          <form onSubmit={submitHandle}>
            <div>
              <p className="font-bold mb-5 text-xl text-indigo-400">Filters</p>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-8 font-semibold"
              >
                Price Range
              </Typography>
              <div className="flex justify-center items-center">
                <div style={{ width: "300px" }}></div>
              </div>
              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <span className="bg-white text-black p-2 border-2 border-gray-300">
                    ₹{formattedAmountMin}
                  </span>
                  <div className="text-black mt-1">Min</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-white text-black p-2 border-2 border-gray-300">
                    ₹{formattedAmountMax}
                  </span>
                  <div className="text-black mt-1">Max</div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <div className="flex text-center font-bold font-[latto] text-black">
                  30K
                </div>
                <div className="w-full flex items-center px-2 mx-1">
                  <Slider
                    className="w-full"
                    color="black"
                    value={value}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={30000}
                    max={10000000}
                    step={25000}
                    disableSwap
                  />
                </div>
                <div className="flex text-center font-bold font-[latto] text-black">
                  1Cr
                </div>
              </div>
              <Autocomplete
                id="area-autocomplete"
                freeSolo
                options={AreaData}
                getOptionLabel={(option) => option.area}
                sx={{ width: "100%", background: "White" }}
                value={
                  filterForm.area ? { area: filterForm.area } : { area: "" }
                }
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    area: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    area: newValue ? newValue.area : "",
                  }));
                }}
                renderInput={(params) => <TextField {...params} label="Area" />}
              />

              <Autocomplete
                id="year-autocomplete"
                freeSolo
                options={AreaData}
                getOptionLabel={(option) => option.year.toString()}
                sx={{ width: "Full", background: "White" }}
                value={filterForm.year ? { year: filterForm.year } : {year :""}} // Bind to state
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    year: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    year: newValue ? newValue.year : "",
                  }));
                }}
                renderInput={(params) => <TextField {...params} label="Year" />}
              />

              <Autocomplete
                id="brand-autocomplete"
                freeSolo
                options={brands}
                getOptionLabel={(option) => option}
                sx={{ width: "Full", background: "White" }}
                value={filterForm.brand}
                onChange={handleBrandChange}
                renderInput={(params) => (
                  <TextField {...params} label="Brands" />
                )}
              />

              <Autocomplete
                id="model-autocomplete"
                freeSolo
                options={modelOptions}
                getOptionLabel={(option) => option}
                sx={{ width: "Full", background: "White" }}
                value={filterForm.model}
                onChange={handleModelChange}
                renderInput={(params) => (
                  <TextField {...params} label="Models" />
                )}
              />

              <Autocomplete
                id="fueltype-autocomplete"
                freeSolo
                options={FuleType}
                getOptionLabel={(option) => option.fuelType}
                sx={{ width: "Full", background: "White" }}
                value={
                  filterForm.fuelType ? { fuelType: filterForm.fuelType } : {fuelType:""}
                } // Bind to state
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    fuelType: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    fuelType: newValue ? newValue.fuelType : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Fuel Type" />
                )}
              />

              <Autocomplete
                id="transmission-autocomplete"
                freeSolo
                options={Transmission}
                getOptionLabel={(option) => option.transmission}
                sx={{ width: "Full", background: "White" }}
                value={
                  filterForm.transmission
                    ? { transmission: filterForm.transmission }
                    : {transmission:""}
                } // Bind to state
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    transmission: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    transmission: newValue ? newValue.transmission : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Transmission" />
                )}
              />
            </div>
            <div className="flex gap-5 mt-5 md:flex-col lg:flex">
              <Button type="submit" className="bg-indigo-400">
                Search
              </Button>
              <Button onClick={resetForm} className="bg-indigo-400">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default FilterCars;
