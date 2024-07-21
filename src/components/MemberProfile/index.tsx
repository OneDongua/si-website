import clsx from "clsx";

import styles from "./index.module.css";

function MemberProfile({
  className,
  id,
  name,
  position,
  avatar,
  children,
  githubUrl,
  blogUrl,
}: {
  className?: string;
  id: number;
  name: string;
  position: string;
  avatar: string;
  children: string;
  githubUrl?: string;
  blogUrl?: string;
}) {
  return (
    <div className={clsx(styles.parent, className)}>
      <div className="card card--full-height shadow--md">
        <div className="card__header">
          <div className="avatar">
            <img
              className="avatar__photo"
              src={avatar ? avatar : `/member_avatars/avatar_${id}.png`}
              alt={`${name}'s avatar`}
            />
            <div className="avatar__intro">
              <div className="avatar__name">{name}</div>
              <small className="avatar__subtitle">{position}</small>
            </div>
          </div>
        </div>
        <div className="card__body padding-top--md">{children}</div>
        <div className="card__footer">
          <div className="button-group button-group--block">
            {githubUrl && (
              <a
                className="button button--secondary"
                href={githubUrl}
                target="_blank">
                GitHub
              </a>
            )}
            {blogUrl && (
              <a
                className="button button--secondary"
                href={blogUrl}
                target="_blank">
                Blog
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
