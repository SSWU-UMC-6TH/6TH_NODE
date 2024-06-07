class CreateMissionDto {
constructor(store_id, reward, deadline, mission_spec) {
      this.store_id = store_id;
      this.reward = reward;
      this.deadline = deadline;
      this.mission_spec = mission_spec;
   }
}

class CreateMissionChallengeDto {
   constructor(member_id, mission_id) {
      this.member_id = member_id;
      this.mission_id = mission_id;
   }
}

module.exports = {
   CreateMissionDto,
   CreateMissionChallengeDto
};

