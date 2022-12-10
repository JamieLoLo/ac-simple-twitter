import styles from "./TweetItem.module.scss";
import moment from "moment";
import useMoment from "../hooks/useMoment";
import defaultFig from "../components/assets/icons/defaultFig.svg";

const DetailTweetItem = () => {
  useMoment();
  const timestamp = moment().valueOf();
  const currentTime = moment(timestamp).format(
    "Ah:mm:ss[・]YYYY[年]MM[月]DD[日]"
  );

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetInfo}>
        <img className={styles.avatar} src={defaultFig} alt="Default Fig" />
        <div className={styles.tweetCreatorInfo}>
          <div className={styles.container}>
            <div className={styles.name}>Apple</div>
            <div className={styles.account}>@apple</div>
          </div>
          <div className={styles.createTime}>・{currentTime}</div>
        </div>
      </div>
      <div className={styles.tweetContent}>
        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
        cillum dolor. Voluptate exercitation incididunt aliquip deserunt.{" "}
      </div>

      <div className={styles.tweetFeedback}>
        <div className={styles.reply}>
          <div className={styles.messageIcon}></div>
          <div className={styles.num}>13</div>
        </div>
        <div className={styles.like}>
          <div className={styles.likeIcon}></div>
          <div className={styles.num}>808</div>
        </div>
      </div>
    </div>
  );
};

export default DetailTweetItem;
