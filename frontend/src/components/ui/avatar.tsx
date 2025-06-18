import { FC } from 'react';

interface AvatarProps {
  /**
   * Optional initials to display; defaults to 'U' for User
   */
  initials?: string;
}

/**
 * A simple circular avatar component showing user initials or a placeholder.
 */
export const Avatar: FC<AvatarProps> = ({ initials = 'U' }) => (
  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white">
    {initials}
  </div>
);
