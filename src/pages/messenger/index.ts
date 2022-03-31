import {withRouter} from '../../utils/router';
import {connect} from '../../store';
import MessengerPage from './messenger';

export default withRouter(connect((state) => ({
  user: state,
}), MessengerPage));
