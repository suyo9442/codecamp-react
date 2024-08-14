import {ChangeEvent, useRef, useState} from "react";
import {AddImg,AddImgBox,AddImgContent,FileInput,ImgDeleteBtn,ImgUpdateBtn} from "@/src/components/units/board/write/BoardWriter.styles";
import {IBoardImgProps} from "@/src/components/units/board/write/BoardWrite.types"; import {gql, useMutation} from "@apollo/client"; import {IMutation,IMutationUploadFileArgs} from "@/src/commons/types/generated/type"; import {checkValidationImg} from "@/src/components/commons/libraries/validation";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`

export default function BoardImg(props: IBoardImgProps) {
	const fileRef = useRef<HTMLInputElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	
	const [uploadFile] = useMutation<Pick<IMutation,"uploadFile">, IMutationUploadFileArgs>(UPLOAD_FILE);
	const onClickFileRef = () => fileRef.current?.click();
	const onChangeFile = async (e: ChangeEvent<HTMLInputElement>, idx: number): Promise<void> => {
		console.log(e.target.files?.[0])
		const file = e.target.files?.[0];
		
		const isValid = checkValidationImg(file)
		if(!isValid) return;
		
		const result = await uploadFile({variables: { file }});
		if(result.data?.uploadFile?.url) props.onSetImgUrls(result.data?.uploadFile?.url, idx);
	};
	
	return (
		<>
			{
				props.item ? (
					<AddImg style={{ opacity: isVisible ? '1' : '0' }}>
						<ImgUpdateBtn onClick={onClickFileRef} />
            <ImgDeleteBtn onClick={() => props.onDeleteFile(props.idx)} />
            <img
              src={`https://storage.googleapis.com/${props.item}`}
              alt={`uploaded-img-${props.idx}`}
              onLoad={() => setIsVisible(true)}
            />
          </AddImg>
				) : (
					<AddImgBox onClick={onClickFileRef}>
					  <AddImgContent/>
					  Upload
					</AddImgBox>
				)
			}
			
			<FileInput
			  ref={fileRef}
			  type="file"
			  accept="image/jpeg,image/png"
			  onChange={(e) => onChangeFile(e, props.idx)}
			  readOnly
			/>
		</>
	)
}
