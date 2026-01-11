import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  View,
  RefreshControl
} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H2,
  H4,
  Theme,
  Spinner,
  Input,
  Card,
  Separator,
  Button
} from 'tamagui';
import {
  ArrowLeft,
  Plus,
  Search,
  FolderTree,
  Folder,
  FolderOpen,
  PieChart,
  TrendingUp,
  Edit3,
  Trash2,
  X,
  ChevronRight,
  ChevronDown,
  Tag,
  Palette,
  Image as ImageIcon,
  Layers,
  BarChart3,
  AlertTriangle,
  Check
} from '@tamagui/lucide-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Services
import { ApiService } from '../services/apiService';

// Color options for category selection
const COLOR_OPTIONS = [
  { id: 'red', value: '#EF4444', name: 'Red' },
  { id: 'orange', value: '#F97316', name: 'Orange' },
  { id: 'amber', value: '#F59E0B', name: 'Amber' },
  { id: 'yellow', value: '#EAB308', name: 'Yellow' },
  { id: 'lime', value: '#84CC16', name: 'Lime' },
  { id: 'green', value: '#22C55E', name: 'Green' },
  { id: 'emerald', value: '#10B981', name: 'Emerald' },
  { id: 'teal', value: '#14B8A6', name: 'Teal' },
  { id: 'cyan', value: '#06B6D4', name: 'Cyan' },
  { id: 'blue', value: '#3B82F6', name: 'Blue' },
  { id: 'indigo', value: '#6366F1', name: 'Indigo' },
  { id: 'violet', value: '#8B5CF6', name: 'Violet' },
  { id: 'purple', value: '#A855F7', name: 'Purple' },
  { id: 'pink', value: '#EC4899', name: 'Pink' },
  { id: 'rose', value: '#F43F5E', name: 'Rose' },
];

// Icon options (using single characters or emoji)
const ICON_OPTIONS = [
  { id: 'shopping', value: '🛒', name: 'Shopping' },
  { id: 'food', value: '🍕', name: 'Food' },
  { id: 'transport', value: '🚗', name: 'Transport' },
  { id: 'home', value: '🏠', name: 'Home' },
  { id: 'entertainment', value: '🎬', name: 'Entertainment' },
  { id: 'health', value: '🏥', name: 'Health' },
  { id: 'education', value: '📚', name: 'Education' },
  { id: 'salary', value: '💰', name: 'Salary' },
  { id: 'investment', value: '📈', name: 'Investment' },
  { id: 'gift', value: '🎁', name: 'Gift' },
  { id: 'travel', value: '✈️', name: 'Travel' },
  { id: 'subscription', value: '🔄', name: 'Subscription' },
  { id: 'default', value: '📁', name: 'Default' },
];

export default function Categories() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // State
  const [categories, setCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'tree', 'analytics'

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    parent_id: '',
    icon: '',
    color: '#3B82F6'
  });

  // Fetch all data
  const fetchCategoriesData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch categories list
      const categoriesRes = await ApiService.get('/categories/categories/');
      setCategories(categoriesRes.data || []);
      
      // Try to fetch category tree
      try {
        const treeRes = await ApiService.get('/categories/categories/tree');
        setCategoryTree(treeRes.data || []);
      } catch (treeError) {
        console.log('Could not fetch category tree:', treeError.message);
        // Build tree from flat list if tree endpoint fails
        buildCategoryTree(categoriesRes.data || []);
      }
      
      // Try to fetch analytics
      try {
        const analyticsRes = await ApiService.get('/categories/categories/analytics');
        setAnalytics(analyticsRes.data);
      } catch (analyticsError) {
        console.log('Could not fetch analytics:', analyticsError.message);
      }
      
      // Try to fetch trends
      try {
        const trendsRes = await ApiService.get('/categories/categories/analytics/trends');
        setTrends(trendsRes.data || []);
      } catch (trendsError) {
        console.log('Could not fetch trends:', trendsError.message);
      }
      
    } catch (error) {
      console.error('Fetch categories error:', error);
      Alert.alert('Error', 'Failed to load categories');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategoriesData();
    }, [fetchCategoriesData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  // Build tree from flat list
  const buildCategoryTree = (flatCategories) => {
    const tree = [];
    const map = {};
    
    // Create map of categories
    flatCategories.forEach(category => {
      map[category.id] = { ...category, children: [] };
    });
    
    // Build tree structure
    flatCategories.forEach(category => {
      if (category.parent_id && map[category.parent_id]) {
        map[category.parent_id].children.push(map[category.id]);
      } else {
        tree.push(map[category.id]);
      }
    });
    
    setCategoryTree(tree);
  };

  // Toggle category expansion
  const toggleCategoryExpand = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      parent_id: '',
      icon: '',
      color: '#3B82F6'
    });
    setSelectedCategory(null);
  };

  // Create category
  const handleCreateCategory = async () => {
    try {
      // Basic validation
      if (!formData.name.trim()) {
        Alert.alert('Error', 'Please enter a category name');
        return;
      }

      const categoryData = {
        name: formData.name.trim(),
        parent_id: formData.parent_id || null,
        icon: formData.icon || null,
        color: formData.color
      };

      await ApiService.post('/categories/categories/', categoryData);
      
      setShowAddModal(false);
      resetForm();
      fetchCategoriesData();
      
      Alert.alert('Success', 'Category created successfully');
      
    } catch (error) {
      console.error('Create category error:', error);
      
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const validationErrors = error.response.data.detail;
        const errorMessages = validationErrors.map(err => 
          `${err.loc?.join('.') || 'Field'}: ${err.msg}`
        ).join('\n\n');
        
        Alert.alert('Validation Error', errorMessages);
      } else {
        Alert.alert('Error', error.message || 'Failed to create category');
      }
    }
  };

  // Update category
  const handleUpdateCategory = async () => {
    try {
      if (!selectedCategory) return;
      
      if (!formData.name.trim()) {
        Alert.alert('Error', 'Please enter a category name');
        return;
      }

      const categoryData = {
        name: formData.name.trim(),
        parent_id: formData.parent_id || null,
        icon: formData.icon || null,
        color: formData.color
      };

      await ApiService.patch(`/categories/categories/${selectedCategory.id}`, categoryData);
      
      setShowAddModal(false);
      resetForm();
      fetchCategoriesData();
      
      Alert.alert('Success', 'Category updated successfully');
      
    } catch (error) {
      console.error('Update category error:', error);
      
      if (error.response?.status === 422 && error.response?.data?.detail) {
        const validationErrors = error.response.data.detail;
        const errorMessages = validationErrors.map(err => 
          `${err.loc?.join('.') || 'Field'}: ${err.msg}`
        ).join('\n\n');
        
        Alert.alert('Validation Error', errorMessages);
      } else {
        Alert.alert('Error', error.message || 'Failed to update category');
      }
    }
  };

  // Delete category
  const handleDeleteCategory = async (category) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await ApiService.delete(`/categories/categories/${category.id}`);
              fetchCategoriesData();
              Alert.alert('Success', 'Category deleted successfully');
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete category');
            }
          }
        }
      ]
    );
  };

  // Open edit modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || '',
      parent_id: category.parent_id || '',
      icon: category.icon || '',
      color: category.color || '#3B82F6'
    });
    setShowAddModal(true);
  };

  // Open analytics modal
  const openAnalyticsModal = () => {
    setShowAnalyticsModal(true);
  };

  // Filter categories
  const getFilteredCategories = () => {
    return categories
      .filter(category => 
        !searchQuery || 
        category.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.name?.localeCompare(b.name));
  };

  // Render tree item recursively
  const renderTreeItem = (category, level = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasChildren = category.children && category.children.length > 0;
    
    return (
      <YStack key={category.id}>
        <TouchableOpacity 
          onPress={() => toggleCategoryExpand(category.id)}
          activeOpacity={0.8}
        >
          <Card 
            backgroundColor="#1A1A1A" 
            mb={8} 
            p={16}
            ml={level * 20}
            borderRadius={12}
            borderLeftWidth={4}
            borderLeftColor={category.color || '#3B82F6'}
          >
            <XStack jc="space-between" ai="center">
              <XStack ai="center" space={12} f={1}>
                {hasChildren ? (
                  <TouchableOpacity onPress={() => toggleCategoryExpand(category.id)}>
                    {isExpanded ? (
                      <ChevronDown size={16} color="#666666" />
                    ) : (
                      <ChevronRight size={16} color="#666666" />
                    )}
                  </TouchableOpacity>
                ) : (
                  <View style={{ width: 16 }} />
                )}
                
                <View style={{ 
                  width: 32, 
                  height: 32, 
                  borderRadius: 16, 
                  backgroundColor: category.color ? `${category.color}20` : 'rgba(59, 130, 246, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text color={category.color || '#3B82F6'} fontSize={16}>
                    {category.icon || '📁'}
                  </Text>
                </View>
                
                <YStack flex={1}>
                  <Text color="white" fontWeight="800" fontSize={16}>
                    {category.name}
                  </Text>
                  {category.parent_id && (
                    <Text color="#666666" fontSize={11}>
                      Sub-category
                    </Text>
                  )}
                </YStack>
              </XStack>
              
              <XStack ai="center" space={12}>
                {category.is_system && (
                  <Tag size={14} color="#EAB308" />
                )}
                
                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation();
                    openEditModal(category);
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Edit3 size={16} color="#3B82F6" />
                </TouchableOpacity>
                
                {!category.is_system && (
                  <TouchableOpacity 
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category);
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </XStack>
            </XStack>
          </Card>
        </TouchableOpacity>
        
        {isExpanded && hasChildren && (
          <YStack>
            {category.children.map(child => renderTreeItem(child, level + 1))}
          </YStack>
        )}
      </YStack>
    );
  };

  // Render category item for list view
  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity 
        onPress={() => openEditModal(item)}
        activeOpacity={0.8}
      >
        <Card 
          backgroundColor="#1A1A1A" 
          mb={12} 
          p={16} 
          borderRadius={12}
          borderLeftWidth={4}
          borderLeftColor={item.color || '#3B82F6'}
        >
          <XStack jc="space-between" ai="center">
            <XStack ai="center" space={12}>
              <View style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 20, 
                backgroundColor: item.color ? `${item.color}20` : 'rgba(59, 130, 246, 0.2)',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text color={item.color || '#3B82F6'} fontSize={18}>
                  {item.icon || '📁'}
                </Text>
              </View>
              
              <YStack>
                <Text color="white" fontWeight="800" fontSize={16}>
                  {item.name}
                </Text>
                <Text color="#666666" fontSize={12}>
                  {item.parent_id ? 'Sub-category' : 'Main Category'}
                </Text>
              </YStack>
            </XStack>
            
            <XStack ai="center" space={12}>
              {item.is_system && (
                <Tag size={16} color="#EAB308" />
              )}
              
              {!item.is_system && (
                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation();
                    handleDeleteCategory(item);
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              )}
            </XStack>
          </XStack>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading && !categories.length) {
    return (
      <Theme name="dark">
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size="large" color="#EAB308" />
            <Text color="white" mt={16}>Loading categories...</Text>
          </View>
        </SafeAreaView>
      </Theme>
    );
  }

  return (
    <Theme name="dark">
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        {/* HEADER */}
        <XStack p={20} ai="center" space={16}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#EAB308" />
          </TouchableOpacity>
          
          <YStack flex={1}>
            <H2 color="#EAB308" fontWeight="900" fontSize={28}>
              Categories
            </H2>
            <Text color="#666666" fontSize={14}>
              Organize your finances
            </Text>
          </YStack>
          
          <TouchableOpacity 
            onPress={openAnalyticsModal}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#1A1A1A',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#444444',
              marginRight: 12
            }}
          >
            <BarChart3 size={20} color="#EAB308" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setShowAddModal(true)}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#1A1A1A',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#EAB308',
            }}
          >
            <Plus size={20} color="#EAB308" />
          </TouchableOpacity>
        </XStack>

        {/* TABS */}
        <XStack p={20} pb={0} space={12}>
          <TouchableOpacity
            onPress={() => setActiveTab('list')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'list' ? '#EAB30820' : '#1A1A1A',
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: activeTab === 'list' ? '#EAB308' : '#333333',
            }}
          >
            <XStack ai="center" space={6}>
              <Folder size={14} color={activeTab === 'list' ? '#EAB308' : '#666666'} />
              <Text 
                color={activeTab === 'list' ? '#EAB308' : '#666666'} 
                fontSize={14} 
                fontWeight="700"
              >
                List
              </Text>
            </XStack>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('tree')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'tree' ? '#3B82F620' : '#1A1A1A',
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: activeTab === 'tree' ? '#3B82F6' : '#333333',
            }}
          >
            <XStack ai="center" space={6}>
              <FolderTree size={14} color={activeTab === 'tree' ? '#3B82F6' : '#666666'} />
              <Text 
                color={activeTab === 'tree' ? '#3B82F6' : '#666666'} 
                fontSize={14} 
                fontWeight="700"
              >
                Tree
              </Text>
            </XStack>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('analytics')}
            style={{
              flex: 1,
              backgroundColor: activeTab === 'analytics' ? '#10B98120' : '#1A1A1A',
              paddingVertical: 10,
              borderRadius: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: activeTab === 'analytics' ? '#10B981' : '#333333',
            }}
          >
            <XStack ai="center" space={6}>
              <PieChart size={14} color={activeTab === 'analytics' ? '#10B981' : '#666666'} />
              <Text 
                color={activeTab === 'analytics' ? '#10B981' : '#666666'} 
                fontSize={14} 
                fontWeight="700"
              >
                Stats
              </Text>
            </XStack>
          </TouchableOpacity>
        </XStack>

        {/* SEARCH */}
        <XStack p={20} pb={12}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 12, paddingHorizontal: 12 }}>
            <Search size={16} color="#666666" />
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              backgroundColor="transparent"
              borderWidth={0}
              color="white"
              placeholderTextColor="#666666"
              fontSize={14}
              flex={1}
            />
          </View>
        </XStack>

        {/* CONTENT */}
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#EAB308"
            />
          }
        >
          {/* LIST VIEW */}
          {activeTab === 'list' && (
            <FlatList
              data={getFilteredCategories()}
              keyExtractor={(item, index) => item?.id || index.toString()}
              renderItem={renderCategoryItem}
              scrollEnabled={false}
              ListEmptyComponent={
                <YStack ai="center" py={48}>
                  <Folder size={64} color="#333333" />
                  <Text color="#666666" fontSize={16} mt={16}>
                    No categories found
                  </Text>
                  <Text color="#444444" fontSize={14} mt={8} mb={16}>
                    {searchQuery ? 'Try changing your search' : 'Create your first category'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowAddModal(true)}
                    style={{
                      backgroundColor: '#EAB308',
                      paddingHorizontal: 24,
                      paddingVertical: 12,
                      borderRadius: 12,
                    }}
                  >
                    <Text color="black" fontSize={14} fontWeight="700">Create Category</Text>
                  </TouchableOpacity>
                </YStack>
              }
            />
          )}

          {/* TREE VIEW */}
          {activeTab === 'tree' && (
            <YStack>
              {categoryTree.length > 0 ? (
                categoryTree.map(category => renderTreeItem(category))
              ) : (
                <YStack ai="center" py={48}>
                  <FolderTree size={64} color="#333333" />
                  <Text color="#666666" fontSize={16} mt={16}>
                    No category hierarchy
                  </Text>
                  <Text color="#444444" fontSize={14} mt={8} mb={16}>
                    Create categories with parent-child relationships
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowAddModal(true)}
                    style={{
                      backgroundColor: '#EAB308',
                      paddingHorizontal: 24,
                      paddingVertical: 12,
                      borderRadius: 12,
                    }}
                  >
                    <Text color="black" fontSize={14} fontWeight="700">Create Category</Text>
                  </TouchableOpacity>
                </YStack>
              )}
            </YStack>
          )}

          {/* ANALYTICS VIEW */}
          {activeTab === 'analytics' && (
            <YStack space={16}>
              {/* Analytics Summary */}
              <Card bg="#1A1A1A" p={20} br={12} borderColor="#10B981" borderWidth={1}>
                <XStack ai="center" space={12} mb={16}>
                  <PieChart size={24} color="#10B981" />
                  <Text color="#10B981" fontSize={16} fontWeight="800">
                    CATEGORY ANALYTICS
                  </Text>
                </XStack>
                
                <YStack space={12}>
                  <XStack jc="space-between" ai="center">
                    <Text color="rgba(255,255,255,0.7)" fontSize={14}>Total Categories</Text>
                    <Text color="white" fontSize={16} fontWeight="800">{categories.length}</Text>
                  </XStack>
                  
                  <Separator borderColor="rgba(255,255,255,0.1)" />
                  
                  <XStack jc="space-between" ai="center">
                    <Text color="rgba(255,255,255,0.7)" fontSize={14}>Main Categories</Text>
                    <Text color="white" fontSize={16} fontWeight="800">
                      {categories.filter(c => !c.parent_id).length}
                    </Text>
                  </XStack>
                  
                  <Separator borderColor="rgba(255,255,255,0.1)" />
                  
                  <XStack jc="space-between" ai="center">
                    <Text color="rgba(255,255,255,0.7)" fontSize={14}>Sub-categories</Text>
                    <Text color="white" fontSize={16} fontWeight="800">
                      {categories.filter(c => c.parent_id).length}
                    </Text>
                  </XStack>
                  
                  <Separator borderColor="rgba(255,255,255,0.1)" />
                  
                  <XStack jc="space-between" ai="center">
                    <Text color="rgba(255,255,255,0.7)" fontSize={14}>System Categories</Text>
                    <Text color="white" fontSize={16} fontWeight="800">
                      {categories.filter(c => c.is_system).length}
                    </Text>
                  </XStack>
                </YStack>
              </Card>

              {/* Trends */}
              {trends.length > 0 && (
                <Card bg="#1A1A1A" p={20} br={12} borderColor="#EAB308" borderWidth={1}>
                  <XStack ai="center" space={12} mb={16}>
                    <TrendingUp size={24} color="#EAB308" />
                    <Text color="#EAB308" fontSize={16} fontWeight="800">
                      SPENDING TRENDS
                    </Text>
                  </XStack>
                  
                  <YStack space={12}>
                    {trends.slice(0, 5).map((trend, index) => (
                      <XStack key={index} jc="space-between" ai="center">
                        <Text color="rgba(255,255,255,0.7)" fontSize={14}>{trend.category || 'Unknown'}</Text>
                        <Text color="#EAB308" fontSize={14} fontWeight="800">
                          {trend.amount ? `₹${trend.amount?.toLocaleString()}` : 'N/A'}
                        </Text>
                      </XStack>
                    ))}
                  </YStack>
                </Card>
              )}

              {/* Color Distribution */}
              <Card bg="#1A1A1A" p={20} br={12} borderColor="#8B5CF6" borderWidth={1}>
                <XStack ai="center" space={12} mb={16}>
                  <Palette size={24} color="#8B5CF6" />
                  <Text color="#8B5CF6" fontSize={16} fontWeight="800">
                    COLOR DISTRIBUTION
                  </Text>
                </XStack>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <XStack space={12}>
                    {COLOR_OPTIONS.slice(0, 8).map(color => {
                      const count = categories.filter(c => c.color === color.value).length;
                      if (count === 0) return null;
                      
                      return (
                        <YStack key={color.id} ai="center" space={4}>
                          <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: color.value,
                          }} />
                          <Text color="white" fontSize={12}>{count}</Text>
                        </YStack>
                      );
                    })}
                  </XStack>
                </ScrollView>
              </Card>
            </YStack>
          )}
        </ScrollView>

        {/* ADD/EDIT CATEGORY MODAL */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
            <ScrollView style={{ maxHeight: '80%' }}>
              <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
                <XStack jc="space-between" ai="center" mb={24}>
                  <H4 color="white" fontWeight="800" fontSize={20}>
                    {selectedCategory ? 'Edit Category' : 'Create Category'}
                  </H4>
                  <TouchableOpacity onPress={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}>
                    <X size={24} color="#666666" />
                  </TouchableOpacity>
                </XStack>

                <YStack space={16}>
                  {/* Name */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Category Name
                    </Text>
                    <Input
                      placeholder="e.g., Groceries, Entertainment"
                      value={formData.name}
                      onChangeText={(text) => setFormData({...formData, name: text})}
                      backgroundColor="#333333"
                      borderColor="#444444"
                      color="white"
                      placeholderTextColor="#666666"
                      fontSize={16}
                    />
                  </YStack>

                  {/* Parent Category */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Parent Category (Optional)
                    </Text>
                    <Card 
                      backgroundColor="#333333" 
                      p={12} 
                      br={8}
                      borderColor="#444444"
                      borderWidth={1}
                    >
                      <XStack jc="space-between" ai="center">
                        <Text color="white" fontSize={14}>
                          {formData.parent_id ? 
                            categories.find(c => c.id === formData.parent_id)?.name || 'Select parent' : 
                            'No parent (main category)'
                          }
                        </Text>
                        <ChevronDown size={16} color="#666666" />
                      </XStack>
                    </Card>
                    
                    {/* Parent category selection */}
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      style={{ marginTop: 8 }}
                    >
                      <XStack space={8}>
                        <TouchableOpacity
                          onPress={() => setFormData({...formData, parent_id: ''})}
                        >
                          <Card
                            backgroundColor={!formData.parent_id ? '#EAB30820' : '#333333'}
                            p={10}
                            br={6}
                            borderWidth={1}
                            borderColor={!formData.parent_id ? '#EAB308' : '#444444'}
                          >
                            <Text 
                              color={!formData.parent_id ? '#EAB308' : 'white'} 
                              fontSize={12} 
                              fontWeight="600"
                            >
                              No Parent
                            </Text>
                          </Card>
                        </TouchableOpacity>
                        
                        {categories
                          .filter(c => !c.parent_id && (!selectedCategory || c.id !== selectedCategory.id))
                          .slice(0, 5)
                          .map(category => (
                            <TouchableOpacity
                              key={category.id}
                              onPress={() => setFormData({...formData, parent_id: category.id})}
                            >
                              <Card
                                backgroundColor={formData.parent_id === category.id ? '#3B82F620' : '#333333'}
                                p={10}
                                br={6}
                                borderWidth={1}
                                borderColor={formData.parent_id === category.id ? '#3B82F6' : '#444444'}
                              >
                                <Text 
                                  color={formData.parent_id === category.id ? '#3B82F6' : 'white'} 
                                  fontSize={12} 
                                  fontWeight="600"
                                >
                                  {category.name}
                                </Text>
                              </Card>
                            </TouchableOpacity>
                          ))
                        }
                      </XStack>
                    </ScrollView>
                  </YStack>

                  {/* Color Selection */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Color
                    </Text>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                    >
                      <XStack space={8}>
                        {COLOR_OPTIONS.map(color => (
                          <TouchableOpacity
                            key={color.id}
                            onPress={() => setFormData({...formData, color: color.value})}
                          >
                            <Card
                              backgroundColor={formData.color === color.value ? `${color.value}40` : '#333333'}
                              p={12}
                              br={8}
                              borderWidth={2}
                              borderColor={formData.color === color.value ? color.value : '#444444'}
                            >
                              <View style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                backgroundColor: color.value,
                              }} />
                            </Card>
                          </TouchableOpacity>
                        ))}
                      </XStack>
                    </ScrollView>
                  </YStack>

                  {/* Icon Selection */}
                  <YStack>
                    <Text color="#999999" fontSize={14} fontWeight="600" mb={8}>
                      Icon
                    </Text>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                    >
                      <XStack space={8}>
                        {ICON_OPTIONS.map(icon => (
                          <TouchableOpacity
                            key={icon.id}
                            onPress={() => setFormData({...formData, icon: icon.value})}
                          >
                            <Card
                              backgroundColor={formData.icon === icon.value ? '#8B5CF620' : '#333333'}
                              p={12}
                              br={8}
                              borderWidth={1}
                              borderColor={formData.icon === icon.value ? '#8B5CF6' : '#444444'}
                            >
                              <Text fontSize={20}>{icon.value}</Text>
                            </Card>
                          </TouchableOpacity>
                        ))}
                      </XStack>
                    </ScrollView>
                  </YStack>

                  {/* Submit Button */}
                  <TouchableOpacity
                    onPress={selectedCategory ? handleUpdateCategory : handleCreateCategory}
                    style={{
                      backgroundColor: '#EAB308',
                      padding: 16,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 24,
                    }}
                  >
                    <Text color="black" fontSize={16} fontWeight="800">
                      {selectedCategory ? 'Update Category' : 'Create Category'}
                    </Text>
                  </TouchableOpacity>
                </YStack>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* ANALYTICS MODAL */}
        <Modal
          visible={showAnalyticsModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAnalyticsModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
            <ScrollView style={{ maxHeight: '70%' }}>
              <View style={{ backgroundColor: '#1A1A1A', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insets.bottom + 20 }}>
                <XStack jc="space-between" ai="center" mb={24}>
                  <H4 color="white" fontWeight="800" fontSize={20}>
                    Category Analytics
                  </H4>
                  <TouchableOpacity onPress={() => setShowAnalyticsModal(false)}>
                    <X size={24} color="#666666" />
                  </TouchableOpacity>
                </XStack>

                {analytics ? (
                  <YStack space={20}>
                    <Text color="white" fontSize={14} lineHeight={22}>
                      {typeof analytics === 'string' ? analytics : JSON.stringify(analytics, null, 2)}
                    </Text>
                  </YStack>
                ) : (
                  <YStack ai="center" py={40}>
                    <BarChart3 size={48} color="#333333" />
                    <Text color="#666666" fontSize={16} mt={16}>
                      No analytics data available
                    </Text>
                    <Text color="#444444" fontSize={14} mt={8}>
                      Analytics will appear as you use categories
                    </Text>
                  </YStack>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </SafeAreaView>
    </Theme>
  );
}
