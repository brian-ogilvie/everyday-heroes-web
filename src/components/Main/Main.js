import React from 'react'
import './Main.css'

import { Switch, Route, Redirect } from 'react-router-dom'
import Today from '../Today/Today'
import Progress from '../Progress/Progress'
import TaskDetail from '../TaskDetail/TaskDetail'
import CompleteTask from '../CompleteTask/CompleteTask'
import ChallengeDetail from '../ChallengeDetail/ChallengeDetail'
import Profile from '../Profile/Profile'
import EditProfile from '../EditProfile/EditProfile'

const Main = ({currentUser, displayMessages, updateCurrentUser, deleteAccount}) => {
  return (
    <div className="Main">
      <Switch>
        <Route path="/" exact render={ props => {
          if (currentUser) {
            return <Redirect to="/today" />
          } else {
            return "Please sign in or create an account"
          }
        }}/>
        <Route path="/profile" exact render={ () => {
          if (currentUser) {
            return <Profile currentUser={currentUser} displayMessages={displayMessages} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/profile/edit" render={ () => {
          if (currentUser) {
            return <EditProfile currentUser={currentUser} displayMessages={displayMessages} deleteAccount={deleteAccount} updateCurrentUser={updateCurrentUser} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/today" render={ () => {
          if (currentUser) {
            return <Today currentUser={currentUser} displayMessages={displayMessages} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/progress" render={ () => {
          if (currentUser) {
            return <Progress currentUser={currentUser} displayMessages={displayMessages} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/tasks" exact render={() => {
          return <Redirect to="/today" />
        }} />
        <Route path="/tasks/:habitId" exact render={ props => {
          if (currentUser) {
            const habitId = props.match.params.habitId
            return <TaskDetail habitId={habitId} displayMessages={displayMessages} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/challenges/:challengeId" exact render={ props => {
          if (currentUser) {
            return <ChallengeDetail challengeId={props.match.params.challengeId} displayMessages={displayMessages} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/challenges/:challengeId/complete" render={ props => {
          if (currentUser) {
            const challengeId = props.match.params.challengeId
            return <CompleteTask challengeId={challengeId} displayMessages={displayMessages} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/tasks/:habitId/complete/:taskId" render={ props => {
          if (currentUser) {
            const taskId = props.match.params.taskId
            const habitId = props.match.params.habitId
            return <CompleteTask taskId={taskId} habitId={habitId} displayMessages={displayMessages} />
          } else {
            return <Redirect to="/" />
          }
        }} />
      </Switch>
    </div>
  )
}

export default Main