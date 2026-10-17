export const users = [
  { username: "admin", password: "Sliet@Admin#2026", name: "Rishabh Verma", role: "Chief Warden" },
  { username: "warden", password: "Sliet@Warden#2026", name: "Sunita Rao", role: "Assistant Warden" },
]

export const initialStudents = [
  { id: 1, name: "Aarav Sharma", rollNo: "254064001", course: "Computer Science", year: "3rd", phone: "9876543210", room: "101", feeStatus: "Paid" },
  { id: 2, name: "Rohan Verma", rollNo: "254074001", course: "Mechanical", year: "2nd", phone: "9812345678", room: "101", feeStatus: "Pending" },
  { id: 3, name: "Kabir Singh", rollNo: "254054001", course: "Electrical", year: "3rd", phone: "9898012345", room: "102", feeStatus: "Paid" },
  { id: 4, name: "Vivaan Gupta", rollNo: "254064002", course: "Computer Science", year: "1st", phone: "9765432109", room: "105", feeStatus: "Paid" },
  { id: 5, name: "Ishaan Patel", rollNo: "254084001", course: "Electronics", year: "2nd", phone: "9001122334", room: "105", feeStatus: "Paid" },
  { id: 6, name: "Arjun Nair", rollNo: "254074002", course: "Mechanical", year: "3rd", phone: "9845098450", room: "201", feeStatus: "Pending" },
  { id: 7, name: "Aditya Kumar", rollNo: "254064003", course: "Computer Science", year: "4th", phone: "9934567812", room: "201", feeStatus: "Paid" },
  { id: 8, name: "Siddharth Joshi", rollNo: "254084002", course: "Electronics", year: "1st", phone: "9123456780", room: "203", feeStatus: "Paid" },
  { id: 9, name: "Karan Malhotra", rollNo: "254054002", course: "Electrical", year: "2nd", phone: "9988776655", room: "210", feeStatus: "Pending" },
  { id: 12, name: "Dev Chauhan", rollNo: "254074003", course: "Mechanical", year: "3rd", phone: "9871234560", room: "301", feeStatus: "Paid" },
  { id: 13, name: "Nikhil Saxena", rollNo: "254084003", course: "Electronics", year: "2nd", phone: "9811122233", room: "301", feeStatus: "Paid" },
  { id: 14, name: "Pranav Iyer", rollNo: "254054003", course: "Electrical", year: "1st", phone: "9822233344", room: "301", feeStatus: "Pending" },
  { id: 15, name: "Harsh Tiwari", rollNo: "254084004", course: "Electronics", year: "2nd", phone: "9833344455", room: "304", feeStatus: "Paid" },
  { id: 16, name: "Rahul Yadav", rollNo: "254074004", course: "Mechanical", year: "3rd", phone: "9844455566", room: "312", feeStatus: "Paid" },
  { id: 17, name: "Shubham Kumar Singh", rollNo: "254064004", course: "Computer Science", year: "2nd", phone: "9771174465", room: "", feeStatus: "Pending" },
  { id: 18, name: "Naman Kumar Sinha", rollNo: "254064005", course: "Computer Science", year: "1st", phone: "7856893952", room: "", feeStatus: "Pending" },
  { id: 19, name: "Aman", rollNo: "254074005", course: "Mechanical", year: "2nd", phone: "8307949109", room: "", feeStatus: "Pending" },
  { id: 20, name: "Sumit Bansal", rollNo: "254084005", course: "Electronics", year: "3rd", phone: "7340435001", room: "", feeStatus: "Pending" },
  { id: 21, name: "Sagar Kumar", rollNo: "254054005", course: "Electrical", year: "1st", phone: "", room: "", feeStatus: "Pending" },
]

export const initialRooms = []
for (let floor = 1; floor <= 3; floor++) {
  for (let i = 1; i <= 32; i++) {
    const number = floor + String(i).padStart(2, "0")
    initialRooms.push({ number: number, floor: floor, capacity: 3 })
  }
}

export const initialBookings = []

export const initialComplaints = [
  { id: 1, studentName: "Rohan Verma", room: "101", title: "Fan not working", category: "Electrical", priority: "High", description: "The ceiling fan stopped working two days ago. It makes a noise but does not spin.", status: "Pending", date: "2026-10-14" },
  { id: 2, studentName: "Ishaan Patel", room: "105", title: "Bad taste of mess food", category: "Mess", priority: "Medium", description: "The food served in the mess has been tasteless and sometimes stale for the past few days.", status: "Pending", date: "2026-10-15" },
]

export const initialMenu = [
  { day: "Monday", breakfast: "Aloo Paratha, Curd, Tea", lunch: "Rajma, Jeera Rice, Roti, Salad", snacks: "Samosa, Tea", dinner: "Mix Veg, Dal Tadka, Roti, Rice" },
  { day: "Tuesday", breakfast: "Poha, Jalebi, Milk", lunch: "Kadhi Pakora, Rice, Roti", snacks: "Bread Pakora, Tea", dinner: "Paneer Butter Masala, Roti, Rice" },
  { day: "Wednesday", breakfast: "Idli, Sambar, Coconut Chutney", lunch: "Chole, Bhature, Salad", snacks: "Biscuits, Coffee", dinner: "Aloo Gobi, Dal Fry, Roti, Rice" },
  { day: "Thursday", breakfast: "Upma, Banana, Tea", lunch: "Dal Makhani, Rice, Roti, Raita", snacks: "Veg Sandwich, Tea", dinner: "Bhindi Masala, Dal, Roti, Kheer" },
  { day: "Friday", breakfast: "Chole Kulche, Tea", lunch: "Sambar, Rice, Aloo Fry, Papad", snacks: "Maggi, Tea", dinner: "Veg Biryani, Raita, Gulab Jamun" },
  { day: "Saturday", breakfast: "Masala Dosa, Chutney, Coffee", lunch: "Matar Paneer, Rice, Roti", snacks: "Pav Bhaji", dinner: "Egg Curry / Malai Kofta, Roti, Rice" },
  { day: "Sunday", breakfast: "Puri Sabzi, Halwa, Tea", lunch: "Special Thali", snacks: "Pakode, Tea", dinner: "Khichdi, Kadhi, Papad, Pickle" },
]

export const mealTimings = [
  { meal: "Breakfast", time: "7:30 AM - 9:30 AM" },
  { meal: "Lunch", time: "12:30 PM - 2:30 PM" },
  { meal: "Snacks", time: "5:00 PM - 6:00 PM" },
  { meal: "Dinner", time: "8:00 PM - 10:00 PM" },
]

export const initialAnnouncements = [
  { id: 1, title: "Register entry is compulsory", message: "All students must make their entry in the hostel register every time they go out or come back. Entries will be checked by the warden.", category: "Rules", date: "2026-10-16", pinned: true, author: "Rishabh Verma" },
]
