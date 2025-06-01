import React from 'react'
import PomodoroCard from './PomodoroCard'
import styles from './Main.module.css'
import { IoIosClock } from "react-icons/io";

const Main = () => {
  return (
    <main className={styles.principal}>
        <IoIosClock />
        <h1 className={styles.principal__titulo}>Pomodoro</h1>
        <PomodoroCard/>
    </main>
  )
}

export default Main
