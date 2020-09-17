import { deleteShiftFromMovies } from "./movieService";

const shifts = [
  {
    id: 1,
    time: "15:00",
    status: "Activo",
  },
  {
    id: 2,
    time: "16:00",
    status: "Inactivo",
  },
];

const allShiftTimes = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

let lastId = shifts.length;

export const getAvailableShifts = (shiftTime) => {
  const available = allShiftTimes.filter(
    (time) => !shifts.map((shift) => shift.time).includes(time)
  );
  if (shiftTime) {
    available.push(shiftTime);
    available.sort((a, b) => (b < a ? 1 : -1));
  }
  return available;
};

export function getShifts() {
  return shifts;
}

export function getShift(shiftId) {
  if (!shiftId) return "";
  const index = shifts.findIndex((s) => s.id == shiftId);
  return shifts[index];
}

export function saveShift(shift) {
  if (!shift.id) {
    const newShift = {
      id: ++lastId,
      time: shift.time,
      status: shift.status,
    };
    shifts.push(newShift);
    return;
  }

  const index = shifts.findIndex((s) => s.id === shift.id);
  shifts[index] = shift;
}

export function deleteShift(shiftId) {
  deleteShiftFromMovies(shiftId);
  const index = shifts.findIndex((s) => s.id === shiftId);
  shifts.splice(index, 1);
}
