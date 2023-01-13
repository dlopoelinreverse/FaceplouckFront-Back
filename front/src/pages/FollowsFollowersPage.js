import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FollowsFollowers from "../components/FollowingFollower/FollowsFollowers";
import { isEmpty } from "../utils/Utils";

const FollowsFollwersPage = ({ show }) => {
  const { userId } = useParams();
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <div className="follows-followers page">
      <div className="follows-followers-main">
        <div className="header-button">
          <Link to={`../${userId}`}>
            <span className="icon-btn">
              <img src="/img/icons/chevron-left-solid.svg" alt="" />
            </span>
          </Link>
        </div>
        {userId && !isEmpty(usersData) && (
          <FollowsFollowers userId={userId} usersData={usersData} show={show} />
        )}
      </div>
      <div className="main-right-part">
        <p>right part</p>
      </div>
    </div>
  );
};

export default FollowsFollwersPage;
