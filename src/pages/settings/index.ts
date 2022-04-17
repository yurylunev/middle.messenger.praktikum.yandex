import {withRouter} from '../../utils/router';
import {connect} from '../../store';
import SettingsPage from './settings';

export default withRouter(connect((state) => ({
  user: state.user,
}), SettingsPage));
