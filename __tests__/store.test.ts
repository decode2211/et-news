import { describe, it, expect, beforeEach } from "vitest";
import useUserStore from "@/store/userStore";
import type { UserProfile } from "@/types";

describe("userStore", () => {
  beforeEach(() => {
    useUserStore.setState({ userProfile: null });
  });

  it("initializes with null userProfile", () => {
    const { userProfile } = useUserStore.getState();
    expect(userProfile).toBeNull();
  });

  it("setUser updates userProfile", () => {
    const profile: UserProfile = { type: "investor", interests: ["tech"] };
    useUserStore.getState().setUser(profile);
    expect(useUserStore.getState().userProfile).toEqual(profile);
  });

  it("setUser called twice with same value keeps the profile", () => {
    const profile: UserProfile = { type: "student", interests: ["science"] };
    useUserStore.getState().setUser(profile);
    useUserStore.getState().setUser(profile);
    expect(useUserStore.getState().userProfile).toEqual(profile);
  });

  it("setUser replaces previous profile", () => {
    const p1: UserProfile = { type: "investor", interests: ["finance"] };
    const p2: UserProfile = { type: "founder", interests: ["startup"] };
    useUserStore.getState().setUser(p1);
    useUserStore.getState().setUser(p2);
    expect(useUserStore.getState().userProfile).toEqual(p2);
  });
});
