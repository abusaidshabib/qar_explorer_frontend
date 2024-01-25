import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "english",
  words: {
    camera: {
      english: "Camera",
      arabic: "الكاميرا",
    },
    settings: {
      english: "Settings",
      arabic: "إعدادات",
    },
    dashboard: {
      english: "Data Collection",
      arabic: "جمع البيانات",
    },
    question: {
      english: "Question",
      arabic: "سؤال"
    },
    answer:{
      english: "Answer",
      arabic: "سؤال"
    },
    review: {
      english: "review",
      arabic: "مراجعة"
    },
    action: {
      english: "action",
      arabic: "فعل"
    },
    title: {
      english: "title",
      arabic: "عنوان"
    },
    description: {
      english: "description",
      arabic: "وصف"
    },
    accept: {
      english: "accept",
      arabic: "يقبل"
    },
    reject: {
      english: "reject",
      arabic: "يرفض"
    },
    delete:{
      english: "delete",
      arabic: "يمسح"
    },
    edit:{
      english: "edit",
      arabic: "يحرر"
    },
    serial:{
      english: "serial",
      arabic: "مسلسل"
    },
    email: {
      english: "Email",
      arabic: "بريد إلكتروني",
    },
    password: {
      english: "Password",
      arabic: "كلمة المرور",
    },
    online: {
      english: "online",
      arabic: "متصل",
    },
    offline: {
      english: "offline",
      arabic: "غير متصل على الانترنت",
    },
    status: {
      english: "Status",
      arabic: "حالة",
    },
    out: {
      english: "Out",
      arabic: "عدد الخارجين",
    },
    in: {
      english: "In",
      arabic: "عدد الداخلين",
    },
    Location: {
      english: "Location",
      arabic: "موقع",
    },
    lat: {
      english: "Lat",
      arabic: "خط العرض",
    },
    long: {
      english: "Long",
      arabic: "خط الطول",
    },
    Logout: {
      english: "Logout",
      arabic: "تسجيل خروج",
    },
    tent: {
      english: "Tent",
      arabic: "خيمة",
    },
    ["Admin Panel"]: {
      english: "Admin Panel",
      arabic: "لوحة الادارة",
    },
    ["Total Out"]: {
      english: "Total Out",
      arabic: "العدد الاجمالي للخارجين",
    },
    ["Total In"]: {
      english: "Total In",
      arabic: "العدد الاجمالي للداخلين",
    },
    ["Currently Staying"]: {
      english: "Currently Staying",
      arabic: "الإقامة حاليا",
    },
    ["Select a tent"]: {
      english: "Select a tent",
      arabic: "اختر خيمة",
    },
    ["Select a camera"]: {
      english: "Select a camera",
      arabic: "حدد الكاميرا",
    },
    ["Register Tent"]: {
      english: "Register Tent",
      arabic: "تسجيل خيمة",
    },
    ["Tent List"]: {
      english: "Tent List",
      arabic: "قائمة الخيام",
    },
    ["Register Camera"]: {
      english: "Register Camera",
      arabic: "تسجيل الكاميرا",
    },
    ["Camera list"]: {
      english: "Camera list",
      arabic: "قائمة الكاميرا",
    },
    ["Camera Settings"]: {
      english: "Camera Settings",
      arabic: "إعدادات الكاميرا",
    },
    ["Register User"]: {
      english: "Register User",
      arabic: "تسجيل مستخدم",
    },
    ["User List"]: {
      english: "User List",
      arabic: "قائمة المستخدم",
    },
    ["Tent Name"]: {
      english: "Tent Name",
      arabic: "اسم الخيمة",
    },
    ["Finetuning QA"]:{
      english: "Finetuning QA",
      arabic: "ضبط الجودة"
    },
    ["RAG Data"]:{
      english: "RAG Data",
      arabic: "بيانات راج"
    },
    ["name"]: {
      english: "Name",
      arabic: "اسم",
    },
    ["id"]: {
      english: "ID",
      arabic: "بطاقة تعريف",
    },
    ["Serial No."]: {
      english: "Serial No",
      arabic: "الرقم التسلسلي",
    },
    ["Detection Zone"]: {
      english: "Detection Zone",
      arabic: "منطقة الكشف",
    },
    ["username"]: {
      english: "username",
      arabic: "اسم المستخدم",
    },
    ["confirm password"]: {
      english: "Confirm Password",
      arabic: "تأكيد كلمة المرور",
    },
    ["Edit Here for Rectangle"]: {
      english: "Edit Here for Rectangle",
      arabic: "تحرير هنا للمستطيل",
    },
    ["Edit Here for Line 1"]: {
      english: "Edit Here for Line 1",
      arabic: "تحرير هنا للسطر 1",
    },
    ["Edit Here for Line 2"]: {
      english: "Edit Here for Line 2",
      arabic: "تحرير هنا للسطر 2",
    },
    ['User roles']: {
      english: "User roles",
      arabic: "أدوار المستخدمين",
    },
    ['Assigned tent']: {
      english: "Assigned tent",
      arabic: "الخيمة المخصصة",
    },
    ['Today In']: {
      english: "Today In",
      arabic: "اليوم في",
    },
    ['Today Out']: {
      english: "Today Out",
      arabic: "اليوم خارج",
    },
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state) => {
      state.lang = state.lang == "english" ? "arabic" : "english";
    },
  },
});

export default languageSlice;
export const { setLanguage } = languageSlice.actions;
