@startuml

class User {
  +_id : string
  +email : string
  +passwordHash : string
  +name : string
  +bio : string
  +skills : List<string>
  +avgRating : float
}

class Offer {
  +_id : string
  +title : string
  +description : string
  +category : string
  +createdBy : User
  +createdAt : Date
}

class Session {
  +_id : string
  +offerId : Offer
  +tutorId : User
  +learnerId : User
  +scheduledTime : Date
  +status : string
}

class Review {
  +_id : string
  +fromUser : User
  +toUser : User
  +rating : int
  +comment : string
  +createdAt : Date
}

' Relationships
User "1" --> "*" Offer : creates
User "1" --> "*" Session : participates
Offer "1" --> "*" Session : scheduled
User "1" --> "*" Review : gives
User "1" <-- "*" Review : receives

@enduml
