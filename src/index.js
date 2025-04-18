import React from "react";
import {
  LocationCity,
  Healing,
  HealingOutlined,
  LocalHospital,
  LocalPharmacy,
  LocalPharmacyOutlined,
  Person,
  People,
  PinDrop,
  Tune,
} from "@material-ui/icons";
import { FormattedMessage } from "@openimis/fe-core";
import AdminMainMenu from "./components/AdminMainMenu";
import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import messagesEn from "./translations/en.json";
import UserPicker from "./components/pickers/UserPicker";
import EnrolmentOfficerPicker from "./components/pickers/EnrolmentOfficerPicker";
import SubstitutionEnrolmentOfficerPicker from "./components/pickers/SubstitutionEnrolmentOfficerPicker";
import UserRolesPicker from "./components/pickers/UserRolesPicker";
import UserTypesPicker from "./components/pickers/UserTypesPicker";
import PaymentPointManagerPicker from "./components/pickers/PaymentPointManagerPicker";
import reducer from "./reducer";
import { USER_PICKER_PROJECTION } from "./actions";
import {
  RIGHT_PRODUCTS,
  RIGHT_HEALTHFACILITIES,
  RIGHT_PRICELISTMS,
  RIGHT_PRICELISTMI,
  RIGHT_MEDICALSERVICES,
  RIGHT_MEDICALITEMS,
  // RIGHT_ENROLMENTOFFICER,
  // RIGHT_CLAIMADMINISTRATOR,
  RIGHT_USERS,
  RIGHT_LOCATIONS,
} from "./constants";

const ROUTE_ADMIN_USERS = "admin/users";
const ROUTE_ADMIN_USER_OVERVIEW = "admin/users/overview";
const ROUTE_ADMIN_USER_NEW = "admin/users/new";

const DEFAULT_CONFIG = {
  translations: [{ key: "en", messages: messagesEn }],
  reducers: [{ key: "admin", reducer }],
  "core.Router": [
    { path: ROUTE_ADMIN_USERS, component: UsersPage },
    { path: ROUTE_ADMIN_USER_NEW, component: UserPage },
    {
      path: `${ROUTE_ADMIN_USER_OVERVIEW}/:user_id`,
      component: UserPage,
    },
  ],
  "core.MainMenu": [{ name: "AdminMainMenu", component: AdminMainMenu }],
  refs: [
    { key: "admin.UserPicker", ref: UserPicker },
    { key: "admin.EnrolmentOfficerPicker", ref: EnrolmentOfficerPicker },
    { key: "admin.SubstitutionEnrolmentOfficerPicker", ref: SubstitutionEnrolmentOfficerPicker },
    { key: "admin.UserRolesPicker", ref: UserRolesPicker },
    { key: "admin.UserTypesPicker", ref: UserTypesPicker },
    {
      key: "admin.UserPicker.projection",
      ref: USER_PICKER_PROJECTION,
    },
    { key: "admin.users", ref: ROUTE_ADMIN_USERS },
    { key: "admin.userOverview", ref: ROUTE_ADMIN_USER_OVERVIEW },
    { key: "admin.userNew", ref: ROUTE_ADMIN_USER_NEW },
    { key: "admin.PaymentPointManagerPicker", ref: PaymentPointManagerPicker },
  ],
  "invoice.SubjectAndThirdpartyPicker": [
    {
      type: "user",
      picker: UserPicker,
      pickerProjection: USER_PICKER_PROJECTION,
    },
  ],
  "admin.MainMenu": [
    {
      text: <FormattedMessage module="admin" id="menu.products" />,
      icon: <Tune />,
      route: "/admin/products",
      id: "admin.products",
      filter: (rights) => rights.includes(RIGHT_PRODUCTS),
    },
    {
      text: <FormattedMessage module="admin" id="menu.healthFacilities" />,
      icon: <LocalHospital />,
      route: "/location/healthFacilities",
      withDivider: true,
      id: "admin.healthFacilities",
      filter: (rights) => rights.includes(RIGHT_HEALTHFACILITIES),
    },
    {
      text: <FormattedMessage module="admin" id="menu.medicalServicesPrices" />,
      icon: <HealingOutlined />,
      route: "/medical/pricelists/services",
      id: "admin.services",
      filter: (rights) => rights.includes(RIGHT_PRICELISTMS),
    },
    {
      text: <FormattedMessage module="admin" id="menu.medicalItemsPrices" />,
      icon: <LocalPharmacyOutlined />,
      route: "/medical/pricelists/items",
      withDivider: true,
      id: "admin.items",
      filter: (rights) => rights.includes(RIGHT_PRICELISTMI),
    },
    {
      text: <FormattedMessage module="admin" id="menu.medicalServices" />,
      icon: <Healing />,
      route: "/medical/medicalServices",
      id: "admin.medicalServices",
      filter: (rights) => rights.includes(RIGHT_MEDICALSERVICES),
    },
    {
      text: <FormattedMessage module="admin" id="menu.medicalItems" />,
      icon: <LocalPharmacy />,
      route: "/medical/medicalItems",
      withDivider: true,
      id: "admin.medicalItems",
      filter: (rights) => rights.includes(RIGHT_MEDICALITEMS),
    },
    {
      text: <FormattedMessage module="admin" id="menu.users" />,
      icon: <Person />,
      route: "/admin/users",
      id: "admin.users",
      filter: (rights) => rights.includes(RIGHT_USERS),
    },
    {
      text: <FormattedMessage module="admin" id="menu.locations" />,
      icon: <PinDrop />,
      route: "/location/locations",
      id: "admin.locations",
      filter: (rights) => rights.includes(RIGHT_LOCATIONS),
    },
  ],
};

export const AdminModule = (cfg) => ({ ...DEFAULT_CONFIG, ...cfg });
