import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Schema } from "../types/schema";

export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post("http://localhost:8080/users", data);
    },
  });
}
