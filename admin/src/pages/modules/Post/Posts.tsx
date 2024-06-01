/** @format */

import PostsTable from './PostsTable';
import { PostsColumns } from './columns';

export const Posts = () => {
  return (
    <div>
      <h1 className='mt-6 mx-2 text-xl mb-4 font-medium '>Danh sách bài đăng</h1>
      <PostsTable columns={PostsColumns} />
    </div>
  );
};
