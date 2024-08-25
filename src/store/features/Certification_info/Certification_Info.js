import { createSlice, nanoid } from "@reduxjs/toolkit";

const InitialValue = { certifications: [] };

export const CertificationInfo = createSlice({
  name: "Certifications",
  initialState: InitialValue,
  reducers: {
    Add: (state, action) => {
      const certificate_info = {
        id: nanoid(),
        certificationName: action.payload.certificationName,
      };
      state.certifications.push(certificate_info);
    },

    Remove: (state, action) => {
      state.certifications = state.certifications.filter(
        (certificate_info) => certificate_info.id !== action.payload
      );
    },
  },
});

export const CertificationInfoAction = CertificationInfo.actions;
export default CertificationInfo.reducer;
