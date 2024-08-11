import QueryBuilder from "../../QueryBuilder/QueryBuilder";
import { CarsModel } from "./cars.model";
import { TCars } from "./cars.interfaces";

const createCarsIntoDB = async (payload: TCars) => {
  const result = CarsModel.create([payload]);
  return result;
};

const getAllCarssFromDB = async (query: Record<string, unknown>) => {
  const queryInstance = new QueryBuilder(CarsModel, query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryInstance.model;
  const meta = await queryInstance.countDocuments();

  return { meta, result };
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
  getAllCarssFromDB,
  getSingleCarsFromDB,
  updateCarsIntoDB,
  deleteCarsFromDB,
};
