import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { useEffect } from "react";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import { RHFCheckbox } from "../../components/RHFCheckbox";
import { RHFDateTimePicker } from "../../components/RHFDateTimePicker";
import { RHFDateRangePicker } from "../../components/RHFDateRangePicker";
import { RHFSlider } from "../../components/RHFSlider";
import { RHFSwitch } from "../../components/RHFSwitch";
import { RHFTextField } from "../../components/RHFTextField";

export function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

  const { watch } = useFormContext<Schema>();

  useEffect(() => {
    const { unsubscribe } = watch((value) => console.log(value));

    return () => unsubscribe();
  }, [watch]);

  return (
    <Stack sx={{ gap: 2 }}>
      <RHFTextField<Schema> name="name" label="Name" />
      <RHFTextField<Schema> name="email" label="Email" />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={statesQuery.data}
      />
      <RHFToggleButtonGroup<Schema>
        name="languages"
        options={languagesQuery.data}
      />
      <RHFRadioGroup<Schema>
        name="gender"
        options={gendersQuery.data}
        label="Gender"
      />
      <RHFCheckbox<Schema>
        name="skills"
        options={skillsQuery.data}
        label="Skills"
      />
      <RHFDateTimePicker<Schema>
        name="registrationDateTime"
        label="Registration Date & Time"
      />
      <RHFDateRangePicker<Schema>
        name="formerEmploymentPerion"
        label="Former Employment Period:"
      />
      <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
      <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />
    </Stack>
  );
}
