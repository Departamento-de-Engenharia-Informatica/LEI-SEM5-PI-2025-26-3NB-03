export interface StaffMemberDto {
  code: string;
  name: string;
  email: string;
}

export interface CreateStaffMemberDto {
  code: string;
  name: string;
  email: string;
}

export interface UpdateStaffMemberDto {
  name: string;
  email: string;
}
