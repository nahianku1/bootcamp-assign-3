import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import { CarsModel } from "./cars.model";
import { TCars } from "./cars.interfaces";

const createCarsIntoDB = async (payload: TCars) => {
  const result = CarsModel.create([payload]);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await CarsModel.find({});
  console.log(result);

  return  result ;
};

const getSingleCarsFromDB = async (id: string) => {
  const result = await CarsModel.findOne({ id: id });
  return result;
};

const updateCarsIntoDB = async (id: string, payload: Partial<TCars>) => {
  const result = await CarsModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCarsFromDB = async (id: string) => {
  const result = await CarsModel.findByIdAndDelete(id);
  return result;
};

export const CarsServices = {
  createCarsIntoDB,
  getAllCarsFromDB,
  getSingleCarsFromDB,
  updateCarsIntoDB,
  deleteCarsFromDB,
};
