import React from 'react'

const TestResult = ({user_tests, header_code}) => {
    const userTest = user_tests.find((test) => test.header_code === header_code);
    const [result, setResult] = useState("pending");
    if(userTest){
        setResult(userTest.result ? "Pass" : "Fail");
    }

  return (
    <div>
        {result}
    </div>
  )
}

export default TestResult
