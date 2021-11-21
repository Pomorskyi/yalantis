import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import Empoyees from './components/Empoyees'
import EmpoyeesBirthday from './components/EmpoyeesBirthday'
import axios from 'axios'

function App() {
  const [names, setName] = useState([])

  // useEffect(() => {

  // }, [names])

  useEffect(() => {
    const fetchNames = async () => {
      const localStorageRef = localStorage.getItem('localStorDataId')

      const { data } = await axios.get(
        'https://yalantis-react-school-api.yalantis.com/api/task0/users'
      )

      data.forEach((el) => {
        el.isNeeded = false
      })

      JSON.parse(localStorageRef).forEach((strId) => {
        data.filter((el) => el.id === strId)[0].isNeeded = true
      })

      setName(data)
    }

    fetchNames()
  }, [setName])

  useEffect(() => {
    var localStorDataId = names
      .filter((name) => name.isNeeded)
      .map((name) => {
        return name.id
      })

    window.localStorage.setItem(
      'localStorDataId',
      JSON.stringify(localStorDataId)
    )
    // console.log(
    //   // window.localStorage
    //   //   .getItem('localStorDataId')
    //   //   .split(',')
    //   //   .filter((el) => el !== '')
    //   localStorage.getItem('localStorDataId')
    // )
  }, [names])

  function addBirthSel(id) {
    var res = []
    names.forEach((el) => res.push(el))
    res
      .filter((name) => name.id === id.target.name)
      .forEach((el) => (el.isNeeded = true))

    setName(res)
  }
  function delBirthSel(id) {
    var res = []
    names.forEach((el) => res.push(el))
    res
      .filter((name) => name.id === id.target.name)
      .forEach((el) => (el.isNeeded = false))

    setName(res)
  }

  return (
    <div className='App'>
      <Container>
        <Row className='my-3'>
          <Col sm={12} md={8}>
            <Col>
              <h2 className='nameTableBold px-3'>Employees</h2>
            </Col>
            <Col>
              <Empoyees
                addFun={addBirthSel}
                delFun={delBirthSel}
                namesProp={names}
              />
            </Col>
          </Col>
          <Col sm={12} md={4}>
            <Col>
              <h2 className='nameTableBold px-3'>Employees birthday</h2>
            </Col>
            <Col>
              <EmpoyeesBirthday employees={names} />
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
