export interface Link {
  label: string;
  icon?: string;
  link?: string;
  count?: number;
  isAdmin?:boolean;

}
export const DASHBOARD_LINKS: Link[] = [
  { link: "dashboard", label: "dashboard", icon: "dashboard" ,isAdmin:true},
  { link: "journey", label: "Add Journney", icon: "add" ,isAdmin:true},
  { link: "history", label: "History", icon: "calendar_today",isAdmin:true },
  { link: "analytics", label: "analytics", icon: "assessment",isAdmin:true},
  { link: "payment", label: "payment", icon: "monetization_on",isAdmin:false},
  { link: "userManager", label: "user manager", icon: "people",isAdmin:false },
  { link: "caisse", label: "caisse manager", icon: "work",isAdmin:false },

];

