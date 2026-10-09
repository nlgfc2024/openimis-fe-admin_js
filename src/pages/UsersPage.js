import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withTheme, withStyles } from "@material-ui/core/styles";

import {
  historyPush,
  withModulesManager,
  withHistory,
  clearCurrentPaginationPage,
} from "@openimis/fe-core";
import { MODULE_NAME } from "../constants";
import UserSearcher from "../components/UserSearcher";

const styles = (theme) => ({
  page: theme.page,
});

class UsersPage extends Component {
  onDoubleClick = (u, newTab = false) => {
    historyPush(this.props.modulesManager, this.props.history, "admin.userOverview", [u.id], newTab);
  };

  onAdd = () => {
    historyPush(this.props.modulesManager, this.props.history, "admin.userNew");
  };

  componentDidMount = () => {
    const { module } = this.props;
    if (module !== MODULE_NAME) this.props.clearCurrentPaginationPage();
  };

  render() {
    const { classes, rights } = this.props;
    return (
      <div className={classes.page}>
        <UserSearcher
          cacheFiltersKey="usersPageFiltersCache"
          onDoubleClick={this.onDoubleClick}
          onAdd={this.onAdd}
          rights={rights}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rights: state.core?.user?.i_user?.rights ?? [],
  module: state.core?.savedPagination?.module,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearCurrentPaginationPage }, dispatch);

export default withModulesManager(
  withHistory(connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles)(UsersPage)))),
);
