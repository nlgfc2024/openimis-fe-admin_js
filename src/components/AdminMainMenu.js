import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
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
import { formatMessage, MainMenuContribution, withModulesManager } from "@openimis/fe-core";
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
} from "../constants";

const ADMIN_MAIN_MENU_CONTRIBUTION_KEY = "admin.MainMenu";
const ADMIN_VOUCHER_MAIN_MENU_CONTRIBUTION_KEY = "admin.voucher.MainMenu";

class AdminMainMenu extends Component {
  constructor(props) {
    super(props);
    this.isWorker = props.modulesManager.getConf("fe-core", "isWorker", false);
  }

  render() {
    const { rights } = this.props;
    const entries = [];

    if (this.isWorker) {
      if (rights.includes(RIGHT_USERS)) {
        entries.push({
          text: formatMessage(this.props.intl, "admin", "menu.users"),
          icon: <Person />,
          route: "/admin/users",
          id: "admin.users",
        });
      }

      entries.push(
        ...this.props.modulesManager
          .getContribs(ADMIN_VOUCHER_MAIN_MENU_CONTRIBUTION_KEY)
          .filter((c) => !c.filter || c.filter(rights)),
      );

      if (!entries.length) return null;

      return (
        <MainMenuContribution
          {...this.props}
          header={formatMessage(this.props.intl, "admin", "mainMenu")}
          icon={<LocationCity />}
          entries={entries}
          menuId="AdminMainMenu"
        />
      );
    }

    if (rights.includes(RIGHT_PRODUCTS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.products"),
        icon: <Tune />,
        route: "/admin/products",
        id: "admin.products",
      });
    }
    if (rights.includes(RIGHT_HEALTHFACILITIES)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.healthFacilities"),
        icon: <LocalHospital />,
        route: "/location/healthFacilities",
        withDivider: true,
        id: "admin.healthFacilities",
      });
    }
    if (rights.includes(RIGHT_PRICELISTMS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.medicalServicesPrices"),
        icon: <HealingOutlined />,
        route: "/medical/pricelists/services",
        id: "admin.services",
      });
    }
    if (rights.includes(RIGHT_PRICELISTMI)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.medicalItemsPrices"),
        icon: <LocalPharmacyOutlined />,
        route: "/medical/pricelists/items",
        id: "admin.items",
        withDivider: true,
      });
    }
    if (rights.includes(RIGHT_MEDICALSERVICES)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.medicalServices"),
        icon: <Healing />,
        route: "/medical/medicalServices",
        id: "admin.medicalServices",
      });
    }
    if (rights.includes(RIGHT_MEDICALITEMS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.medicalItems"),
        icon: <LocalPharmacy />,
        route: "/medical/medicalItems",
        withDivider: true,
        id: "admin.medicalItems",
      });
    }
    if (rights.includes(RIGHT_USERS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.users"),
        icon: <Person />,
        route: "/admin/users",
        id: "admin.users",
      });
    }
    if (rights.includes(RIGHT_LOCATIONS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.locations"),
        icon: <PinDrop />,
        route: "/location/locations",
        id: "admin.locations",
      });
    }

    entries.push(
      ...this.props.modulesManager
        .getContribs(ADMIN_MAIN_MENU_CONTRIBUTION_KEY)
        .filter((c) => !c.filter || c.filter(rights)),
    );

    if (!entries.length) return null;
    return (
      <MainMenuContribution
        {...this.props}
        header={formatMessage(this.props.intl, "admin", "mainMenu")}
        icon={<LocationCity />}
        entries={entries}
        menuId="AdminMainMenu"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default withModulesManager(injectIntl(connect(mapStateToProps)(AdminMainMenu)));
