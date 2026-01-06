// // // import React, { useEffect, useState } from 'react';
// // // import { ScrollView, Alert, Modal } from 'react-native';
// // // import { YStack, XStack, Text, Button, Input, H3, H5, Separator, Theme, Avatar, Spinner, Card } from 'tamagui';
// // // import { LinearGradient } from 'expo-linear-gradient';
// // // import { User, Phone, Save, ArrowLeft, Briefcase, LogOut } from '@tamagui/lucide-icons';
// // // import { useRouter } from 'expo-router';
// // // import { UserService } from '../services/userService';
// // // import { AuthService } from '../services/auth';
// // // import { UserProfile } from '../types/api';

// // // export default function ProfileScreen() {
// // //   const router = useRouter();
  
// // //   // --- STATE ---
// // //   const [loading, setLoading] = useState(true);
// // //   const [saving, setSaving] = useState(false);
// // //   const [profile, setProfile] = useState<UserProfile | null>(null);
  
// // //   // Edit Form State
// // //   const [fullName, setFullName] = useState('');
// // //   const [phone, setPhone] = useState('');

// // //   // --- 1. FETCH PROFILE (GET) ---
// // //   const fetchProfile = async () => {
// // //     try {
// // //       const data = await UserService.getProfile();
// // //       setProfile(data);
// // //       // Pre-fill form
// // //       setFullName(data.full_name || '');
// // //       setPhone(data.phone || '');
// // //     } catch (error) {
// // //       console.log("Profile Load Error:", error);
// // //       // Fail silently or show default
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchProfile();
// // //   }, []);

// // //   // --- 2. UPDATE PROFILE (PATCH) ---
// // //   const handleSave = async () => {
// // //     setSaving(true);
// // //     try {
// // //       // Calls PATCH /api/v1/user/profile
// // //       await UserService.updateProfile({ 
// // //         full_name: fullName, 
// // //         phone: phone 
// // //       });
// // //       Alert.alert("Success", "Profile details updated.");
// // //       fetchProfile(); // Refresh data
// // //     } catch (error) {
// // //       Alert.alert("Error", "Failed to update profile. Check connection.");
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const handleLogout = async () => {
// // //     await AuthService.logout();
// // //     router.replace('/'); // Go back to Login
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Theme name="dark">
// // //         <YStack f={1} bg="black" jc="center" ai="center">
// // //           <Spinner size="large" color="$gold3" />
// // //         </YStack>
// // //       </Theme>
// // //     );
// // //   }

// // //   return (
// // //     <Theme name="dark">
// // //       <LinearGradient colors={['#000', '#09090b']} style={{ flex: 1 }}>
// // //         <YStack pt={60} px={20} pb={20} f={1}>
          
// // //           {/* HEADER */}
// // //           <XStack ai="center" mb="$6" space="$2">
// // //             <Button 
// // //               size="$3" chromeless circular 
// // //               icon={<ArrowLeft size={24} color="$silver4" />} 
// // //               onPress={() => router.back()} 
// // //             />
// // //             <H3 color="white">Profile Settings</H3>
// // //           </XStack>

// // //           <ScrollView 
// // //             showsVerticalScrollIndicator={false}
// // //             contentContainerStyle={{ paddingBottom: 50 }}
// // //           >
            
// // //             {/* AVATAR & IDENTITY */}
// // //             <YStack ai="center" mb="$6">
// // //               <YStack 
// // //                 w={100} h={100} br={50} 
// // //                 bg="$gold3" jc="center" ai="center" mb="$3" 
// // //                 shadowColor="$gold3" shadowRadius={15} shadowOpacity={0.3}
// // //               >
// // //                 <Text fontSize={36} fontWeight="900" color="black">
// // //                   {profile?.full_name?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || "U"}
// // //                 </Text>
// // //               </YStack>
// // //               <Text color="white" fontSize={18} fontWeight="bold">{profile?.full_name || "User"}</Text>
// // //               <Text color="$silver4" fontSize={14}>{profile?.email}</Text>
// // //             </YStack>

// // //             {/* EDIT FORM */}
// // //             <YStack space="$4" mb="$6">
// // //               <YStack>
// // //                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1" letterSpacing={1}>FULL DESIGNATION</Text>
// // //                 <Input 
// // //                   value={fullName} onChangeText={setFullName}
// // //                   bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
// // //                   h={50} fontSize={14}
// // //                   icon={<User size={16} color="#71717A" />}
// // //                 />
// // //               </YStack>

// // //               <YStack>
// // //                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1" letterSpacing={1}>CONTACT LINK</Text>
// // //                 <Input 
// // //                   value={phone} onChangeText={setPhone}
// // //                   bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
// // //                   h={50} fontSize={14}
// // //                   icon={<Phone size={16} color="#71717A" />}
// // //                   keyboardType="phone-pad"
// // //                 />
// // //               </YStack>

// // //               <Button 
// // //                 bg="$gold3" color="black" h={50} mt="$2"
// // //                 onPress={handleSave} 
// // //                 disabled={saving} 
// // //                 icon={saving ? <Spinner color="black"/> : <Save size={18}/>}
// // //               >
// // //                 {saving ? "Updating Protocol..." : "Save Changes"}
// // //               </Button>
// // //             </YStack>

// // //             <Separator borderColor="$silver2" mb="$6" opacity={0.2} />

// // //             {/* CONNECTED DATA (Read Only) */}
// // //             <H5 color="white" mb="$4" opacity={0.8}>Active Income Streams</H5>
// // //             <YStack space="$3" mb="$8">
// // //               {profile?.incomes && profile.incomes.length > 0 ? (
// // //                 profile.incomes.map((inc, i) => (
// // //                   <Card key={i} bg="rgba(255,255,255,0.03)" p="$3" borderColor="$silver2" bw={1}>
// // //                     <XStack jc="space-between" ai="center">
// // //                       <XStack ai="center" space="$3">
// // //                         <YStack w={32} h={32} bg="rgba(34, 197, 94, 0.1)" br={8} jc="center" ai="center">
// // //                            <Briefcase size={16} color="#22c55e" />
// // //                         </YStack>
// // //                         <YStack>
// // //                           <Text color="white" fontWeight="bold">{inc.name}</Text>
// // //                           <Text color="$silver4" fontSize={10} textTransform="capitalize">{inc.rate_type} Rate</Text>
// // //                         </YStack>
// // //                       </XStack>
// // //                       <Text color="#22c55e" fontWeight="bold">
// // //                         ${inc.estimated_monthly_amount}
// // //                       </Text>
// // //                     </XStack>
// // //                   </Card>
// // //                 ))
// // //               ) : (
// // //                 <Text color="$silver4" fontStyle="italic" ta="center" py="$4" bg="rgba(255,255,255,0.02)" br="$4">
// // //                   No income streams detected.
// // //                 </Text>
// // //               )}
// // //             </YStack>

// // //             {/* LOGOUT */}
// // //             <Button 
// // //               chromeless 
// // //               icon={<LogOut size={18} color="#ef4444"/>} 
// // //               onPress={handleLogout} 
// // //               mb={50}
// // //             >
// // //               <Text color="#ef4444">Terminate Session</Text>
// // //             </Button>

// // //           </ScrollView>
// // //         </YStack>
// // //       </LinearGradient>
// // //     </Theme>
// // //   );
// // // }



// // import React, { useEffect, useState } from 'react';
// // import { ScrollView, Alert, RefreshControl } from 'react-native';
// // import { YStack, XStack, Text, Button, Input, H3, H5, Separator, Theme, Spinner, Card } from 'tamagui';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import { User, Phone, Save, ArrowLeft, Briefcase, LogOut } from '@tamagui/lucide-icons';
// // import { useRouter } from 'expo-router';
// // import { UserService } from '../services/userService';
// // import { AuthService } from '../services/auth';
// // import { UserProfile } from '../types/api';

// // export default function ProfileScreen() {
// //   const router = useRouter();
  
// //   // State
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [profile, setProfile] = useState<UserProfile | null>(null);
  
// //   // Form Inputs
// //   const [fullName, setFullName] = useState('');
// //   const [phone, setPhone] = useState('');

// //   // --- FETCH DATA ---
// //   const fetchProfile = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await UserService.getProfile();
// //       console.log("Profile Data Received:", data); // Debug Log
// //       setProfile(data);
      
// //       // Populate fields safely
// //       setFullName(data.full_name || '');
// //       setPhone(data.phone || '');
      
// //     } catch (error: any) {
// //       console.error("Profile Fetch Error:", error);
// //       Alert.alert("Connection Error", "Could not load profile data.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   // --- UPDATE DATA ---
// //   const handleSave = async () => {
// //     setSaving(true);
// //     try {
// //       // Calls PATCH endpoint
// //       await UserService.updateProfile({ 
// //         full_name: fullName, 
// //         phone: phone 
// //       });
// //       Alert.alert("Success", "Profile updated successfully.");
// //       fetchProfile(); // Refresh to ensure sync
// //     } catch (error) {
// //       Alert.alert("Update Failed", "Could not save changes.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     await AuthService.logout();
// //     router.replace('/');
// //   };

// //   if (loading && !profile) {
// //     return (
// //       <Theme name="dark">
// //         <YStack f={1} bg="black" jc="center" ai="center">
// //           <Spinner size="large" color="$gold3" />
// //           <Text color="$silver4" mt="$4">Loading Profile...</Text>
// //         </YStack>
// //       </Theme>
// //     );
// //   }

// //   return (
// //     <Theme name="dark">
// //       <LinearGradient colors={['#000', '#09090b']} style={{ flex: 1 }}>
// //         <YStack pt={60} px={20} pb={20} f={1}>
          
// //           {/* HEADER */}
// //           <XStack ai="center" mb="$6" space="$2">
// //             <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4" />} onPress={() => router.back()} />
// //             <H3 color="white">My Profile</H3>
// //           </XStack>

// //           <ScrollView 
// //             showsVerticalScrollIndicator={false}
// //             refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchProfile} tintColor="#EAB308" />}
// //           >
            
// //             {/* AVATAR */}
// //             <YStack ai="center" mb="$6">
// //               <YStack w={100} h={100} br={50} bg="$gold3" jc="center" ai="center" mb="$3" shadowColor="$gold3" shadowRadius={10}>
// //                 <Text fontSize={36} fontWeight="900" color="black">
// //                   {profile?.full_name?.[0]?.toUpperCase() || "U"}
// //                 </Text>
// //               </YStack>
// //               <Text color="white" fontSize={20} fontWeight="bold">{profile?.full_name || "User"}</Text>
// //               <Text color="$silver4" fontSize={14}>{profile?.email}</Text>
// //             </YStack>

// //             {/* EDITABLE FORM */}
// //             <YStack space="$4" mb="$6">
// //               <YStack>
// //                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1">FULL NAME</Text>
// //                 <Input 
// //                   value={fullName} onChangeText={setFullName}
// //                   bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
// //                   icon={<User size={16} />}
// //                 />
// //               </YStack>

// //               <YStack>
// //                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1">PHONE NUMBER</Text>
// //                 <Input 
// //                   value={phone} onChangeText={setPhone}
// //                   bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
// //                   icon={<Phone size={16} />}
// //                   keyboardType="phone-pad"
// //                 />
// //               </YStack>

// //               <Button bg="$gold3" color="black" onPress={handleSave} disabled={saving} icon={saving ? <Spinner color="black"/> : <Save size={16}/>}>
// //                 {saving ? "Saving..." : "Save Changes"}
// //               </Button>
// //             </YStack>

// //             <Separator borderColor="$silver2" mb="$6" opacity={0.2} />

// //             {/* INCOME SOURCES (Read Only from Profile API) */}
// //             <H5 color="white" mb="$4">Income Sources</H5>
// //             <YStack space="$3" mb="$8">
// //               {profile?.incomes && profile.incomes.length > 0 ? (
// //                 profile.incomes.map((inc, i) => (
// //                   <Card key={i} bg="rgba(255,255,255,0.03)" p="$3" borderColor="$silver2" bw={1}>
// //                     <XStack jc="space-between" ai="center">
// //                       <XStack ai="center" space="$3">
// //                         <Briefcase size={18} color="#22c55e" />
// //                         <YStack>
// //                           <Text color="white" fontWeight="bold">{inc.name}</Text>
// //                           <Text color="$silver4" fontSize={11}>{inc.rate_type}</Text>
// //                         </YStack>
// //                       </XStack>
// //                       <Text color="#22c55e" fontWeight="bold">${inc.estimated_monthly_amount}</Text>
// //                     </XStack>
// //                   </Card>
// //                 ))
// //               ) : (
// //                 <Text color="$silver4" fontStyle="italic" bg="rgba(255,255,255,0.02)" p="$4" br="$4" ta="center">
// //                   No income sources linked yet.
// //                 </Text>
// //               )}
// //             </YStack>

// //             {/* LOGOUT */}
// //             <Button chromeless icon={<LogOut size={18} color="#ef4444"/>} onPress={handleLogout} mb={50}>
// //               <Text color="#ef4444">Log Out</Text>
// //             </Button>

// //           </ScrollView>
// //         </YStack>
// //       </LinearGradient>
// //     </Theme>
// //   );
// // }


// import React, { useEffect, useState, useCallback } from 'react';
// import { ScrollView, Alert, RefreshControl, TouchableOpacity } from 'react-native';
// import { YStack, XStack, Text, Button, Input, H3, H5, Separator, Theme, Spinner, Card, Switch } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { User, Phone, Save, ArrowLeft, Briefcase, LogOut, Shield, Bell, Zap, TrendingUp, PieChart } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { UserService } from '../services/userService';
// import { AuthService } from '../services/auth';
// import { UserProfile } from '../types/api';

// export default function ProfileScreen() {
//   const router = useRouter();
  
//   // State
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [profile, setProfile] = useState<UserProfile | null>(null);
  
//   // Form Inputs
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [aiEnabled, setAiEnabled] = useState(true);

//   // --- FETCH DATA ---
//   const fetchProfile = async () => {
//     setLoading(true);
//     try {
//       const data = await UserService.getProfile();
//       setProfile(data);
//       setFullName(data.full_name || '');
//       setPhone(data.phone || '');
//     } catch (error: any) {
//       Alert.alert("Connection Error", "Could not load profile data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // --- UPDATE DATA ---
//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await UserService.updateProfile({ 
//         full_name: fullName, 
//         phone: phone,
//         preferences: { ai_enabled: aiEnabled } // Example of sending nested object
//       });
//       Alert.alert("Success", "Profile updated successfully.");
//       fetchProfile();
//     } catch (error) {
//       Alert.alert("Update Failed", "Could not save changes.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = async () => {
//     await AuthService.logout();
//     router.replace('/');
//   };

//   if (loading && !profile) {
//     return (
//       <Theme name="dark">
//         <YStack f={1} bg="black" jc="center" ai="center">
//           <Spinner size="large" color="$gold3" />
//         </YStack>
//       </Theme>
//     );
//   }

//   return (
//     <Theme name="dark">
//       <LinearGradient colors={['#000', '#09090b']} style={{ flex: 1 }}>
//         <YStack pt={60} px={20} pb={20} f={1}>
          
//           {/* HEADER */}
//           <XStack jc="space-between" ai="center" mb="$6">
//             <XStack ai="center" space="$2">
//               <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4" />} onPress={() => router.back()} />
//               <H3 color="white">Identity</H3>
//             </XStack>
//             <TouchableOpacity onPress={handleLogout}>
//               <LogOut size={20} color="#ef4444" />
//             </TouchableOpacity>
//           </XStack>

//           <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchProfile} tintColor="#EAB308" />}>
            
//             {/* PROFILE HEADER CARD */}
//             <Card bg="rgba(255,255,255,0.03)" p="$5" br="$6" bw={1} borderColor="$silver2" mb="$6">
//               <XStack space="$4" ai="center">
//                 <YStack w={80} h={80} br={40} bg="$gold3" jc="center" ai="center">
//                   <Text fontSize={32} fontWeight="900" color="black">
//                     {fullName?.[0]?.toUpperCase() || "U"}
//                   </Text>
//                 </YStack>
//                 <YStack f={1}>
//                   <Text color="white" fontSize={22} fontWeight="bold" numberOfLines={1}>{fullName || "User"}</Text>
//                   <Text color="$silver4" fontSize={13} mb="$2">{profile?.email}</Text>
//                   <XStack bg="rgba(34, 197, 94, 0.1)" px="$2" py="$1" br="$2" ai="center" space="$1" self="flex-start">
//                     <Shield size={12} color="#22c55e" />
//                     <Text color="#22c55e" fontSize={10} fontWeight="bold">VERIFIED ACCOUNT</Text>
//                   </XStack>
//                 </YStack>
//               </XStack>
//             </Card>

//             {/* QUICK STATS */}
//             <XStack space="$3" mb="$6">
//                <Card f={1} p="$3" bg="rgba(255,255,255,0.02)" bw={1} borderColor="$silver2" ai="center">
//                   <TrendingUp size={18} color="$gold3" mb="$1" />
//                   <Text color="$silver4" fontSize={10}>RISK LEVEL</Text>
//                   <Text color="white" fontWeight="bold">Medium</Text>
//                </Card>
//                <Card f={1} p="$3" bg="rgba(255,255,255,0.02)" bw={1} borderColor="$silver2" ai="center">
//                   <PieChart size={18} color="$gold3" mb="$1" />
//                   <Text color="$silver4" fontSize={10}>ASSETS</Text>
//                   <Text color="white" fontWeight="bold">{profile?.investments?.length || 0}</Text>
//                </Card>
//             </XStack>

//             {/* PERSONAL DETAILS SECTION */}
//             <H5 color="white" mb="$4" px="$1">Personal Details</H5>
//             <YStack space="$4" mb="$6">
//               <YStack>
//                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1">DISPLAY NAME</Text>
//                 <Input value={fullName} onChangeText={setFullName} bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2" />
//               </YStack>
//               <YStack>
//                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1">MOBILE NUMBER</Text>
//                 <Input value={phone} onChangeText={setPhone} bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2" keyboardType="phone-pad" />
//               </YStack>
//             </YStack>

//             {/* PREFERENCES SECTION */}
//             <H5 color="white" mb="$4" px="$1">System Preferences</H5>
//             <Card bg="rgba(255,255,255,0.02)" p="$1" mb="$6" bw={1} borderColor="$silver2">
//                <XStack jc="space-between" ai="center" p="$4">
//                   <XStack ai="center" space="$3">
//                      <Zap size={20} color="$gold3" />
//                      <YStack>
//                         <Text color="white" fontWeight="bold">AI Analysis</Text>
//                         <Text color="$silver4" fontSize={11}>Enable real-time market insights</Text>
//                      </YStack>
//                   </XStack>
//                   <Switch size="$2" checked={aiEnabled} onCheckedChange={setAiEnabled}>
//                      <Switch.Thumb animation="quicker" />
//                   </Switch>
//                </XStack>
//                <Separator borderColor="$silver2" opacity={0.1} />
//                <XStack jc="space-between" ai="center" p="$4">
//                   <XStack ai="center" space="$3">
//                      <Bell size={20} color="$gold3" />
//                      <YStack>
//                         <Text color="white" fontWeight="bold">Notifications</Text>
//                         <Text color="$silver4" fontSize={11}>Daily budget and txn alerts</Text>
//                      </YStack>
//                   </XStack>
//                   <Switch size="$2" defaultChecked>
//                      <Switch.Thumb animation="quicker" />
//                   </Switch>
//                </XStack>
//             </Card>

//             <Button bg="$gold3" color="black" onPress={handleSave} disabled={saving} mb="$8" fontWeight="bold">
//               {saving ? "Updating Protocol..." : "Save Profile Changes"}
//             </Button>

//             {/* PORTFOLIO SNAPSHOT (FROM PROFILE API) */}
//             <XStack jc="space-between" ai="center" mb="$4">
//               <H5 color="white">Investment Snapshot</H5>
//               <Text color="$gold3" fontSize={12} onPress={() => router.push('/(tabs)/portfolio')}>Full Portfolio</Text>
//             </XStack>
            
//             <YStack space="$3" mb="$8">
//               {profile?.investments && profile.investments.length > 0 ? (
//                 profile.investments.slice(0, 3).map((inv, i) => (
//                   <Card key={i} bg="rgba(0,0,0,0.5)" p="$4" borderColor="$silver2" bw={1}>
//                     <XStack jc="space-between" ai="center">
//                       <YStack>
//                         <Text color="white" fontWeight="bold">{inv.identifier}</Text>
//                         <Text color="$silver4" fontSize={11}>{inv.asset_type.toUpperCase()}</Text>
//                       </YStack>
//                       <Text color="white" fontWeight="bold">${inv.current_value.toLocaleString()}</Text>
//                     </XStack>
//                   </Card>
//                 ))
//               ) : (
//                 <Text color="$silver4" fontStyle="italic" ta="center" py="$4">No active investments found.</Text>
//               )}
//             </YStack>

//           </ScrollView>
//         </YStack>
//       </LinearGradient>
//     </Theme>
//   );
// }


import React, { useEffect, useState } from 'react';
import { ScrollView, Alert, RefreshControl } from 'react-native';
import { YStack, XStack, Text, Button, Input, H3, H5, Separator, Theme, Spinner, Card } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Phone, Save, ArrowLeft, Briefcase, LogOut } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { UserService } from '../services/userService';
import { AuthService } from '../services/auth';
import { UserProfile } from '../types/api';

export default function ProfileScreen() {
  const router = useRouter();
  
  // State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  // Form Inputs
  const [full_Name, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // --- FETCH DATA ---
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await UserService.getProfile();
      setProfile(data);
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
    } catch (error: any) {
      console.error("Profile Fetch Error:", error);
      Alert.alert("Error", "Could not load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // --- UPDATE DATA ---
  const handleSave = async () => {
    if (!full_Name) {
      Alert.alert("Validation", "Name is required.");
      return;
    }
    setSaving(true);
    try {
      // Sending payload as per API spec
      await UserService.updateProfile({ 
        full_name: full_Name, 
        phone: phone,
        preferences: profile?.preferences || {} // Pass existing or empty object
      });
      Alert.alert("Success", "Profile updated.");
      fetchProfile();
    } catch (error) {
      Alert.alert("Update Failed", "Server rejected changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    router.replace('/');
  };

  if (loading && !profile) {
    return (
      <Theme name="dark">
        <YStack f={1} bg="black" jc="center" ai="center">
          <Spinner size="large" color="$gold3" />
        </YStack>
      </Theme>
    );
  }

  return (
    <Theme name="dark">
      <LinearGradient colors={['#000', '#09090b']} style={{ flex: 1 }}>
        <YStack pt={60} px={20} pb={20} f={1}>
          
          {/* HEADER */}
          <XStack ai="center" mb="$6" space="$2">
            <Button size="$3" chromeless circular icon={<ArrowLeft size={24} color="$silver4" />} onPress={() => router.back()} />
            <H3 color="white">My Profile</H3>
          </XStack>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchProfile} tintColor="#EAB308" />}
          >
            
            {/* AVATAR & INFO */}
            <YStack ai="center" mb="$6">
              <YStack w={80} h={80} br={40} bg="$gold3" jc="center" ai="center" mb="$3">
                <Text fontSize={32} fontWeight="900" color="black">
                  {full_Name?.[0]?.toUpperCase() || "U"}
                </Text>
              </YStack>
              <Text color="white" fontSize={20} fontWeight="bold">{full_Name || "User"}</Text>
              <Text color="$silver4" fontSize={14}>{profile?.email}</Text>
            </YStack>

            {/* FORM */}
            <YStack space="$4" mb="$6">
              <YStack>
                <Text color="$silver4" fontSize={11} mb="$2" ml="$1">FULL NAME</Text>
                <Input 
                  value={full_Name} onChangeText={setFullName}
                  bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
                />
              </YStack>

              <YStack>
                <Text color="$silver4" fontSize={11} mb="$2" ml="$1">PHONE NUMBER</Text>
                <Input 
                  value={phone} onChangeText={setPhone}
                  bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
                  keyboardType="phone-pad"
                />
              </YStack>

              <Button bg="$gold3" color="black" onPress={handleSave} disabled={saving} mt="$2">
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </YStack>

            <Separator borderColor="$silver2" mb="$6" opacity={0.2} />

            {/* LISTS (READ ONLY) */}
            <H5 color="white" mb="$4">Essentials</H5>
            
            <YStack space="$3" mb="$4">
              <XStack jc="space-between" bg="rgba(255,255,255,0.03)" p="$4" br="$4" ai="center">
                <Text color="$silver4">Incomes</Text>
                <Text color="white">{profile?.incomes?.length || 0}</Text>
              </XStack>
              <XStack jc="space-between" bg="rgba(255,255,255,0.03)" p="$4" br="$4" ai="center">
                <Text color="$silver4">Investments</Text>
                <Text color="white">{profile?.investments?.length || 0}</Text>
              </XStack>
            </YStack>

            <Button chromeless icon={<LogOut size={18} color="#ef4444"/>} onPress={handleLogout} mt="$6">
              <Text color="#ef4444">Log Out</Text>
            </Button>

          </ScrollView>
        </YStack>
      </LinearGradient>
    </Theme>
  );
}