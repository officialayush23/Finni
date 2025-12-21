// import React, { useEffect, useState } from 'react';
// import { ScrollView, Alert, Modal } from 'react-native';
// import { YStack, XStack, Text, Button, Input, H3, H5, Separator, Theme, Avatar, Spinner, Card } from 'tamagui';
// import { LinearGradient } from 'expo-linear-gradient';
// import { User, Phone, Save, ArrowLeft, Briefcase, LogOut } from '@tamagui/lucide-icons';
// import { useRouter } from 'expo-router';
// import { UserService } from '../services/userService';
// import { AuthService } from '../services/auth';
// import { UserProfile } from '../types/api';

// export default function ProfileScreen() {
//   const router = useRouter();
  
//   // --- STATE ---
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [profile, setProfile] = useState<UserProfile | null>(null);
  
//   // Edit Form State
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');

//   // --- 1. FETCH PROFILE (GET) ---
//   const fetchProfile = async () => {
//     try {
//       const data = await UserService.getProfile();
//       setProfile(data);
//       // Pre-fill form
//       setFullName(data.full_name || '');
//       setPhone(data.phone || '');
//     } catch (error) {
//       console.log("Profile Load Error:", error);
//       // Fail silently or show default
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // --- 2. UPDATE PROFILE (PATCH) ---
//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       // Calls PATCH /api/v1/user/profile
//       await UserService.updateProfile({ 
//         full_name: fullName, 
//         phone: phone 
//       });
//       Alert.alert("Success", "Profile details updated.");
//       fetchProfile(); // Refresh data
//     } catch (error) {
//       Alert.alert("Error", "Failed to update profile. Check connection.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = async () => {
//     await AuthService.logout();
//     router.replace('/'); // Go back to Login
//   };

//   if (loading) {
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
//           <XStack ai="center" mb="$6" space="$2">
//             <Button 
//               size="$3" chromeless circular 
//               icon={<ArrowLeft size={24} color="$silver4" />} 
//               onPress={() => router.back()} 
//             />
//             <H3 color="white">Profile Settings</H3>
//           </XStack>

//           <ScrollView 
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 50 }}
//           >
            
//             {/* AVATAR & IDENTITY */}
//             <YStack ai="center" mb="$6">
//               <YStack 
//                 w={100} h={100} br={50} 
//                 bg="$gold3" jc="center" ai="center" mb="$3" 
//                 shadowColor="$gold3" shadowRadius={15} shadowOpacity={0.3}
//               >
//                 <Text fontSize={36} fontWeight="900" color="black">
//                   {profile?.full_name?.[0]?.toUpperCase() || profile?.email?.[0]?.toUpperCase() || "U"}
//                 </Text>
//               </YStack>
//               <Text color="white" fontSize={18} fontWeight="bold">{profile?.full_name || "User"}</Text>
//               <Text color="$silver4" fontSize={14}>{profile?.email}</Text>
//             </YStack>

//             {/* EDIT FORM */}
//             <YStack space="$4" mb="$6">
//               <YStack>
//                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1" letterSpacing={1}>FULL DESIGNATION</Text>
//                 <Input 
//                   value={fullName} onChangeText={setFullName}
//                   bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
//                   h={50} fontSize={14}
//                   icon={<User size={16} color="#71717A" />}
//                 />
//               </YStack>

//               <YStack>
//                 <Text color="$silver4" fontSize={11} mb="$2" ml="$1" letterSpacing={1}>CONTACT LINK</Text>
//                 <Input 
//                   value={phone} onChangeText={setPhone}
//                   bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
//                   h={50} fontSize={14}
//                   icon={<Phone size={16} color="#71717A" />}
//                   keyboardType="phone-pad"
//                 />
//               </YStack>

//               <Button 
//                 bg="$gold3" color="black" h={50} mt="$2"
//                 onPress={handleSave} 
//                 disabled={saving} 
//                 icon={saving ? <Spinner color="black"/> : <Save size={18}/>}
//               >
//                 {saving ? "Updating Protocol..." : "Save Changes"}
//               </Button>
//             </YStack>

//             <Separator borderColor="$silver2" mb="$6" opacity={0.2} />

//             {/* CONNECTED DATA (Read Only) */}
//             <H5 color="white" mb="$4" opacity={0.8}>Active Income Streams</H5>
//             <YStack space="$3" mb="$8">
//               {profile?.incomes && profile.incomes.length > 0 ? (
//                 profile.incomes.map((inc, i) => (
//                   <Card key={i} bg="rgba(255,255,255,0.03)" p="$3" borderColor="$silver2" bw={1}>
//                     <XStack jc="space-between" ai="center">
//                       <XStack ai="center" space="$3">
//                         <YStack w={32} h={32} bg="rgba(34, 197, 94, 0.1)" br={8} jc="center" ai="center">
//                            <Briefcase size={16} color="#22c55e" />
//                         </YStack>
//                         <YStack>
//                           <Text color="white" fontWeight="bold">{inc.name}</Text>
//                           <Text color="$silver4" fontSize={10} textTransform="capitalize">{inc.rate_type} Rate</Text>
//                         </YStack>
//                       </XStack>
//                       <Text color="#22c55e" fontWeight="bold">
//                         ${inc.estimated_monthly_amount}
//                       </Text>
//                     </XStack>
//                   </Card>
//                 ))
//               ) : (
//                 <Text color="$silver4" fontStyle="italic" ta="center" py="$4" bg="rgba(255,255,255,0.02)" br="$4">
//                   No income streams detected.
//                 </Text>
//               )}
//             </YStack>

//             {/* LOGOUT */}
//             <Button 
//               chromeless 
//               icon={<LogOut size={18} color="#ef4444"/>} 
//               onPress={handleLogout} 
//               mb={50}
//             >
//               <Text color="#ef4444">Terminate Session</Text>
//             </Button>

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
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // --- FETCH DATA ---
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await UserService.getProfile();
      console.log("Profile Data Received:", data); // Debug Log
      setProfile(data);
      
      // Populate fields safely
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
      
    } catch (error: any) {
      console.error("Profile Fetch Error:", error);
      Alert.alert("Connection Error", "Could not load profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // --- UPDATE DATA ---
  const handleSave = async () => {
    setSaving(true);
    try {
      // Calls PATCH endpoint
      await UserService.updateProfile({ 
        full_name: fullName, 
        phone: phone 
      });
      Alert.alert("Success", "Profile updated successfully.");
      fetchProfile(); // Refresh to ensure sync
    } catch (error) {
      Alert.alert("Update Failed", "Could not save changes.");
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
          <Text color="$silver4" mt="$4">Loading Profile...</Text>
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
            
            {/* AVATAR */}
            <YStack ai="center" mb="$6">
              <YStack w={100} h={100} br={50} bg="$gold3" jc="center" ai="center" mb="$3" shadowColor="$gold3" shadowRadius={10}>
                <Text fontSize={36} fontWeight="900" color="black">
                  {profile?.full_name?.[0]?.toUpperCase() || "U"}
                </Text>
              </YStack>
              <Text color="white" fontSize={20} fontWeight="bold">{profile?.full_name || "User"}</Text>
              <Text color="$silver4" fontSize={14}>{profile?.email}</Text>
            </YStack>

            {/* EDITABLE FORM */}
            <YStack space="$4" mb="$6">
              <YStack>
                <Text color="$silver4" fontSize={11} mb="$2" ml="$1">FULL NAME</Text>
                <Input 
                  value={fullName} onChangeText={setFullName}
                  bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
                  icon={<User size={16} />}
                />
              </YStack>

              <YStack>
                <Text color="$silver4" fontSize={11} mb="$2" ml="$1">PHONE NUMBER</Text>
                <Input 
                  value={phone} onChangeText={setPhone}
                  bg="rgba(255,255,255,0.05)" color="white" borderColor="$silver2"
                  icon={<Phone size={16} />}
                  keyboardType="phone-pad"
                />
              </YStack>

              <Button bg="$gold3" color="black" onPress={handleSave} disabled={saving} icon={saving ? <Spinner color="black"/> : <Save size={16}/>}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </YStack>

            <Separator borderColor="$silver2" mb="$6" opacity={0.2} />

            {/* INCOME SOURCES (Read Only from Profile API) */}
            <H5 color="white" mb="$4">Income Sources</H5>
            <YStack space="$3" mb="$8">
              {profile?.incomes && profile.incomes.length > 0 ? (
                profile.incomes.map((inc, i) => (
                  <Card key={i} bg="rgba(255,255,255,0.03)" p="$3" borderColor="$silver2" bw={1}>
                    <XStack jc="space-between" ai="center">
                      <XStack ai="center" space="$3">
                        <Briefcase size={18} color="#22c55e" />
                        <YStack>
                          <Text color="white" fontWeight="bold">{inc.name}</Text>
                          <Text color="$silver4" fontSize={11}>{inc.rate_type}</Text>
                        </YStack>
                      </XStack>
                      <Text color="#22c55e" fontWeight="bold">${inc.estimated_monthly_amount}</Text>
                    </XStack>
                  </Card>
                ))
              ) : (
                <Text color="$silver4" fontStyle="italic" bg="rgba(255,255,255,0.02)" p="$4" br="$4" ta="center">
                  No income sources linked yet.
                </Text>
              )}
            </YStack>

            {/* LOGOUT */}
            <Button chromeless icon={<LogOut size={18} color="#ef4444"/>} onPress={handleLogout} mb={50}>
              <Text color="#ef4444">Log Out</Text>
            </Button>

          </ScrollView>
        </YStack>
      </LinearGradient>
    </Theme>
  );
}