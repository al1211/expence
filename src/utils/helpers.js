export const validateEmail=(email)=>{
    const   reges=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return reges.test(email);
}