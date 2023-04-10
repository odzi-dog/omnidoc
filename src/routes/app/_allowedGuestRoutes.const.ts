// Array of regexp expressions of guest-allowed
// routes under /app route
export const AllowedGuestRoutes = [
    // Allow /app/workspace
    /\/app\/workspace\/(\w|\d|-){36}\/document\/(\w|\d|-){36}/  
];