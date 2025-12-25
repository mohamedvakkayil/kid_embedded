export interface RobotState {
  shape: 'square' | 'round'
  mood: 'happy' | 'cool' | 'surprised'
  color: string
  accessories: Set<string>
  charge: number
}

