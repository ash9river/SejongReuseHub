import { useRecoilValue } from 'recoil'; // useRecoilState 대신 useRecoilValue 사용
import { formState } from 'store/atom/FormAtom';
import { useMutation } from '@tanstack/react-query';
import { FormType } from 'configs/interface/FormInterface';
import axios from 'axios';

function PostData() {
  const formData: FormType = useRecoilValue(formState); // Recoil 상태 읽기
  const mutation = useMutation({
    mutationFn: (formdata: FormType) => {
      return axios.post('/post', formdata);
    },
  });

  mutation.mutate(formData);
  return (
    <div>
      {mutation.isPending ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>form added!</div> : null}
        </>
      )}
    </div>
  );
}

export default PostData;
