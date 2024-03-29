// // React 패키지에서 useState 훅을 임포트합니다.
// import { useState } from 'react';

// // useFormInput은 제네릭 타입 T를 받아 사용자 입력을 관리하는 커스텀 훅입니다.
// export function useFormInput<T>(initialValue: T) {
//   // useState를 사용하여 입력값(value)의 상태를 관리하며, 초기값은 함수 인자로 받습니다.
//   const [value, setValue] = useState(initialValue);
//   // 입력 필드가 변경될 때 호출될 함수를 정의합니다.
//   // React.ChangeEvent<HTMLInputElement> 타입의 이벤트 객체를 매개변수로 받습니다.
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // setValue를 통해 상태를 업데이트합니다. 입력값을 적절한 타입으로 변환하여 상태를 갱신합니다.
//     setValue(e.target.value as unknown as T);
//   };
//   console.log(value);
//   // 훅에서 관리하는 값(value)과 이벤트 핸들러(onChange)를 객체로 묶어 반환합니다.
//   return [value, onChange];
// }
